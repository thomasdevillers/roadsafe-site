import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Roadsafe Traffic",
    short_name: "Roadsafe",
    description:
      "Road safety equipment rentals, delivery and support across South Africa.",
    start_url: "/",
    display: "standalone",
    background_color: "#111312",
    theme_color: "#f47b20",
    lang: "en-ZA",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
