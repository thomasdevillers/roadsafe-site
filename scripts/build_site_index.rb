#!/usr/bin/env ruby

require "cgi"
require "csv"
require "fileutils"
require "json"
require "nokogiri"
require "optparse"
require "time"
require "uri"

options = {}
OptionParser.new do |parser|
  parser.on("--pages-dir PATH") { |value| options[:pages_dir] = value }
  parser.on("--forms-dir PATH") { |value| options[:forms_dir] = value }
  parser.on("--pages-json PATH") { |value| options[:pages_json] = value }
  parser.on("--media-json PATH", Array) { |value| options[:media_json] = value }
  parser.on("--output PATH") { |value| options[:output] = value }
end.parse!

required = %i[pages_dir forms_dir pages_json media_json output]
missing = required.reject { |key| options[key] }
abort "Missing options: #{missing.join(', ')}" unless missing.empty?

SITE_HOSTS = %w[roadsafe.co.za www.roadsafe.co.za].freeze
SYSTEM_PATH_PREFIXES = %w[
  /wp-admin
  /wp-content
  /wp-includes
  /wp-json
  /feed
  /comments/feed
  /xmlrpc.php
].freeze

def clean_text(value)
  CGI.unescapeHTML(value.to_s).gsub(/\u00a0/, " ").gsub(/\s+/, " ").strip
end

def normalize_page_url(value)
  uri = URI.parse(value)
  uri.fragment = nil
  uri.query = nil
  uri.host = "www.roadsafe.co.za" if SITE_HOSTS.include?(uri.host)
  uri.path = "/" if uri.path.to_s.empty?
  uri.path = "#{uri.path}/" unless uri.path.end_with?("/") || File.extname(uri.path) != ""
  uri.to_s
rescue URI::InvalidURIError
  value
end

def resolve_url(base, href)
  URI.join(base, href).to_s
rescue URI::InvalidURIError
  href
end

def page_area(node)
  return "header" if node.ancestors.any? { |ancestor| ancestor["data-elementor-type"] == "header" }
  return "footer" if node.ancestors.any? { |ancestor| ancestor["data-elementor-type"] == "footer" }
  return "page" if node.ancestors.any? { |ancestor| ancestor["data-elementor-type"] == "wp-page" }

  "other"
end

def markdown_escape(value)
  value.to_s.gsub("|", "\\|")
end

pages_api = JSON.parse(File.read(options[:pages_json]))
page_api_by_url = pages_api.to_h { |page| [normalize_page_url(page.fetch("link")), page] }
inventory_urls = page_api_by_url.keys.to_h { |url| [url, true] }

page_records = []
link_records = []
image_usage = []

Dir[File.join(options[:pages_dir], "**", "index.html")].sort.each do |path|
  html = File.read(path)
  document = Nokogiri::HTML(html)
  canonical = document.at_css('link[rel="canonical"]')&.[]("href")
  url = normalize_page_url(canonical || "https://www.roadsafe.co.za/")
  api_page = page_api_by_url[url] || {}
  page_root = document.at_css('[data-elementor-type="wp-page"]') || document.at_css("body")
  visible_root = Nokogiri::HTML.fragment(page_root.inner_html)
  visible_root.css("script, style, noscript, template, svg").remove

  headings = (1..3).to_h do |level|
    [level, visible_root.css("h#{level}").map { |node| clean_text(node.text) }.reject(&:empty?)]
  end
  visible_text = clean_text(visible_root.text)
  page_links = page_root.css("a[href]").map do |anchor|
    href = anchor["href"].to_s.strip
    next if href.empty?

    {
      "text" => clean_text(anchor.text.empty? ? anchor["aria-label"] : anchor.text),
      "href" => resolve_url(url, href)
    }
  end.compact
  ctas = page_links.select do |link|
    label = link["text"].downcase
    label.match?(/quote|more info|view all|take me|specification|contact|products/)
  end

  metform_ids = (
    html.scan(/data-metform-formpicker-key=["'](\d+)["']/).flatten +
    html.scan(/metform-wrap-(\d+)-/).flatten
  ).uniq
  page_images = page_root.css("img")
  page_image_ids = page_images.to_a.map do |image|
    image["class"].to_s[/\bwp-image-(\d+)\b/, 1]
  end.compact.uniq

  page_records << {
    "id" => api_page["id"],
    "slug" => api_page["slug"] || (url == "https://www.roadsafe.co.za/" ? "home" : URI(url).path.split("/").reject(&:empty?).last),
    "url" => url,
    "wordpress_title" => clean_text(api_page.dig("title", "rendered")),
    "browser_title" => clean_text(document.title),
    "meta_description" => clean_text(document.at_css('meta[name="description"]')&.[]("content")),
    "canonical" => canonical.to_s,
    "modified" => api_page["modified"],
    "word_count" => visible_text.split.size,
    "h1" => headings[1],
    "h2" => headings[2],
    "h3" => headings[3],
    "cta_count" => ctas.length,
    "ctas" => ctas,
    "form_ids" => metform_ids,
    "image_count" => page_images.length,
    "images_missing_alt" => page_images.count { |image| clean_text(image["alt"]).empty? },
    "image_ids" => page_image_ids,
    "visible_text" => visible_text
  }

  document.css("a[href]").each do |anchor|
    raw_href = anchor["href"].to_s.strip
    next if raw_href.empty?

    target = resolve_url(url, raw_href)
    target_uri = URI.parse(target)
    type =
      if raw_href.start_with?("#")
        "fragment"
      else
        case target_uri.scheme
        when "mailto" then "email"
        when "tel" then "phone"
        when "http", "https"
          SITE_HOSTS.include?(target_uri.host) ? "internal" : "external"
        else
          "other"
        end
      end

    normalized_target = type == "internal" ? normalize_page_url(target) : target
    target_path = target_uri.path.to_s
    is_system_path = SYSTEM_PATH_PREFIXES.any? { |prefix| target_path.start_with?(prefix) }
    is_content_link = type == "internal" && !is_system_path && File.extname(target_path).empty?

    link_records << {
      "source_url" => url,
      "area" => page_area(anchor),
      "anchor_text" => clean_text(anchor.text.empty? ? anchor["aria-label"] : anchor.text),
      "raw_href" => raw_href,
      "target_url" => target,
      "link_type" => type,
      "target_in_page_inventory" => is_content_link ? inventory_urls.key?(normalized_target) : nil
    }
  rescue URI::InvalidURIError
    next
  end

  page_images.each do |image|
    image_usage << {
      "page_url" => url,
      "asset_id" => image["class"].to_s[/\bwp-image-(\d+)\b/, 1],
      "src" => image["src"].to_s,
      "alt" => clean_text(image["alt"]),
      "width" => image["width"],
      "height" => image["height"]
    }
  end
end

media = options[:media_json].flat_map { |path| JSON.parse(File.read(path)) }
usage_by_id = image_usage.group_by { |item| item["asset_id"] }
asset_records = media.sort_by { |item| item["id"] }.map do |item|
  usage = usage_by_id[item["id"].to_s] || []
  {
    "id" => item["id"],
    "date" => item["date"],
    "title" => clean_text(item.dig("title", "rendered")),
    "alt_text" => clean_text(item["alt_text"]),
    "caption" => clean_text(item.dig("caption", "rendered")),
    "mime_type" => item["mime_type"],
    "source_url" => item["source_url"],
    "used_on_page_count" => usage.map { |entry| entry["page_url"] }.uniq.length,
    "used_on_pages" => usage.map { |entry| entry["page_url"] }.uniq.sort
  }
end

form_records = []
Dir[File.join(options[:forms_dir], "**", "index.html")].sort.each do |path|
  html = File.read(path)
  document = Nokogiri::HTML(html)
  canonical = document.at_css('link[rel="canonical"]')&.[]("href").to_s
  action = html[/data-action=["']([^"']+\/entries\/insert\/(\d+))["']/, 1]
  form_id = html[/data-action=["'][^"']+\/entries\/insert\/(\d+)["']/, 1]
  field_names = html.scan(/\bname=["']([^"']+)["']/).flatten.uniq.reject do |name|
    %w[generator msapplication-TileImage robots viewport].include?(name)
  end
  labels = html.scan(/decodeEntities\(`([^`]+)`\)/).flatten.map { |label| clean_text(label) }.uniq

  form_records << {
    "id" => form_id,
    "slug" => URI(canonical).path.split("/").reject(&:empty?).last,
    "url" => canonical,
    "action" => action,
    "field_names" => field_names,
    "labels_and_prompts" => labels,
    "used_on_pages" => page_records.select { |page| page["form_ids"].include?(form_id) }.map { |page| page["url"] }
  }
end

output = options[:output]
FileUtils.rm_rf(output)
FileUtils.mkdir_p(File.join(output, "content"))
FileUtils.mkdir_p(File.join(output, "source"))

CSV.open(File.join(output, "pages.csv"), "w") do |csv|
  csv << %w[id slug url wordpress_title browser_title modified word_count h1_count h1 h2_count h2 cta_count ctas form_ids image_count images_missing_alt meta_description]
  page_records.sort_by { |page| page["id"].to_i }.each do |page|
    csv << [
      page["id"], page["slug"], page["url"], page["wordpress_title"], page["browser_title"], page["modified"],
      page["word_count"], page["h1"].length, page["h1"].join(" | "), page["h2"].length, page["h2"].join(" | "),
      page["cta_count"], page["ctas"].map { |cta| "#{cta["text"]} -> #{cta["href"]}" }.join(" | "),
      page["form_ids"].join(" | "), page["image_count"], page["images_missing_alt"], page["meta_description"]
    ]
  end
end

CSV.open(File.join(output, "links.csv"), "w") do |csv|
  columns = %w[source_url area anchor_text raw_href target_url link_type target_in_page_inventory]
  csv << columns
  link_records.each { |record| csv << record.values_at(*columns) }
end

CSV.open(File.join(output, "assets.csv"), "w") do |csv|
  csv << %w[id date title alt_text caption mime_type source_url used_on_page_count used_on_pages]
  asset_records.each do |record|
    csv << record.values_at("id", "date", "title", "alt_text", "caption", "mime_type", "source_url", "used_on_page_count") + [record["used_on_pages"].join(" | ")]
  end
end

CSV.open(File.join(output, "image-usage.csv"), "w") do |csv|
  columns = %w[page_url asset_id src alt width height]
  csv << columns
  image_usage.each { |record| csv << record.values_at(*columns) }
end

CSV.open(File.join(output, "forms.csv"), "w") do |csv|
  csv << %w[id slug url action field_names labels_and_prompts used_on_pages]
  form_records.each do |record|
    csv << record.values_at("id", "slug", "url", "action") + [
      record["field_names"].join(" | "),
      record["labels_and_prompts"].join(" | "),
      record["used_on_pages"].join(" | ")
    ]
  end
end

File.write(File.join(output, "pages.json"), JSON.pretty_generate(page_records))
File.write(File.join(output, "summary.json"), JSON.pretty_generate({
  "generated_at" => Time.now.utc.iso8601,
  "site" => "https://www.roadsafe.co.za/",
  "page_count" => page_records.length,
  "form_count" => form_records.length,
  "media_count" => asset_records.length,
  "link_occurrence_count" => link_records.length,
  "unique_link_target_count" => link_records.map { |link| link["target_url"] }.uniq.length,
  "pages_with_h1" => page_records.count { |page| page["h1"].any? },
  "pages_with_meta_description" => page_records.count { |page| !page["meta_description"].empty? },
  "rendered_image_count" => image_usage.length,
  "rendered_images_missing_alt" => image_usage.count { |image| image["alt"].empty? },
  "media_items_missing_alt" => asset_records.count { |asset| asset["alt_text"].empty? },
  "placeholder_hash_links" => link_records.count { |link| link["raw_href"] == "#" },
  "internal_content_links_outside_inventory" => link_records.count { |link| link["target_in_page_inventory"] == false }
}))

page_records.each do |page|
  lines = []
  lines << "# #{page["wordpress_title"]}"
  lines << ""
  lines << "- URL: #{page["url"]}"
  lines << "- WordPress ID: #{page["id"]}"
  lines << "- Modified: #{page["modified"]}"
  lines << "- Browser title: #{page["browser_title"]}"
  lines << "- Meta description: #{page["meta_description"].empty? ? "(missing)" : page["meta_description"]}"
  lines << "- Word count: #{page["word_count"]}"
  lines << "- Forms: #{page["form_ids"].empty? ? "none" : page["form_ids"].join(', ')}"
  lines << "- Images: #{page["image_count"]} (#{page["images_missing_alt"]} missing alt text)"
  lines << ""
  lines << "## Heading Outline"
  lines << ""
  (1..3).each do |level|
    page["h#{level}"].each { |heading| lines << "#{"  " * (level - 1)}- H#{level}: #{heading}" }
  end
  lines << "- No H1-H3 headings found" if (1..3).all? { |level| page["h#{level}"].empty? }
  lines << ""
  lines << "## Calls To Action"
  lines << ""
  if page["ctas"].empty?
    lines << "- None detected"
  else
    page["ctas"].each { |cta| lines << "- #{cta["text"]}: #{cta["href"]}" }
  end
  lines << ""
  lines << "## Extracted Page Copy"
  lines << ""
  lines << page["visible_text"]
  lines << ""
  File.write(File.join(output, "content", "#{page["slug"]}.md"), lines.join("\n"))
end

FileUtils.cp(options[:pages_json], File.join(output, "source", "wordpress-pages.json"))
options[:media_json].each_with_index do |path, index|
  FileUtils.cp(path, File.join(output, "source", "wordpress-media-#{index + 1}.json"))
end

puts JSON.pretty_generate(JSON.parse(File.read(File.join(output, "summary.json"))))
