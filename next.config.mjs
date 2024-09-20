/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "violet-select-limpet-794.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
};

export default nextConfig;
