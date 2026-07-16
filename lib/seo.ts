import type { Metadata } from "next";

export const SITE_NAME = "Roadsafe Traffic";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.roadsafe.co.za").replace(
  /\/$/,
  ""
);
export const DEFAULT_DESCRIPTION =
  "Road safety equipment rental and sales across South Africa, including VMS boards, traffic control units, speed radars, solar light towers and warning lights.";
export const DEFAULT_OG_IMAGE = {
  url: "/images/roadsafe-og.jpg",
  width: 1200,
  height: 630,
  alt: "Roadsafe Traffic road safety equipment operating at South African roadworks"
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noIndex = false
}: PageMetadataOptions): Metadata {
  const socialTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const images = image
    ? [{ url: image, alt: imageAlt || title }]
    : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
      images
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.map((item) => item.url)
    },
    ...(noIndex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {})
  };
}
