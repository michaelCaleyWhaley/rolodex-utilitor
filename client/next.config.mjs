/** @type {import('next').NextConfig} */

const isDev = process.env.NEXT_PUBLIC_ENV === "dev";

const nextConfig = {
  output: "export",
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:4000/api/:path*", // Proxy to Backend
        },
      ];
    },
  }),
};

export default nextConfig;
