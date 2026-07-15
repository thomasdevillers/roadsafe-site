import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/get-a-quote", destination: "/request-a-quote", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/vms", destination: "/products/variable-message-signs", permanent: true },
      { source: "/tcu", destination: "/products/traffic-control-units", permanent: true },
      { source: "/speed-radars", destination: "/products/speed-radars", permanent: true },
      { source: "/classic-vasr", destination: "/products/speed-radars/speed-sentinel-classic", permanent: true },
      { source: "/compact-vasr", destination: "/products/speed-radars/speed-sentinel-compact", permanent: true },
      { source: "/advanced-vasr", destination: "/products/speed-radars/speed-sentinel-advanced", permanent: true },
      { source: "/basic-vasr", destination: "/products/speed-radars/speed-sentinel-essential", permanent: true },
      { source: "/emotional-vasr", destination: "/products/speed-radars/flashguard-dummy-camera", permanent: true },
      { source: "/solar-light-tower", destination: "/products/solar-light-towers", permanent: true },
      { source: "/lights", destination: "/products/warning-lights", permanent: true },
      { source: "/road-stud", destination: "/products/warning-lights/solar-road-stud", permanent: true },
      { source: "/wand-light", destination: "/products/warning-lights/traffic-wand-light", permanent: true },
      { source: "/warning-light", destination: "/products/warning-lights/solar-warning-light", permanent: true },
      { source: "/beacon-light", destination: "/products/warning-lights/beacon-light", permanent: true },
      { source: "/arrow-warning", destination: "/products/warning-lights/double-arrow-light", permanent: true },
      { source: "/products/warning-lights/arrow-warning-board", destination: "/products/warning-lights/double-arrow-light", permanent: true },
      { source: "/half-moon", destination: "/products/warning-lights/half-moon-road-stud", permanent: true }
    ];
  }
};

export default nextConfig;
