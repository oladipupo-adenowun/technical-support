/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/repo-name",
assetPrefix: "/repo-name/",
};

export default nextConfig;
