/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_VISUAL_DIST_DIR || ".next",
  typescript: {
    tsconfigPath:
      process.env.NODE_ENV === "production"
        ? "tsconfig.build.json"
        : "tsconfig.json",
  },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com", pathname: "/img/**" },
    ],
  },
};

export default nextConfig;
