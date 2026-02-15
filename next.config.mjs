/** @type {import('next').NextConfig} */
const API_PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL || "http";
const API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME || "localhost";
// const API_PORT = process.env.NEXT_PUBLIC_API_PORT;

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: API_PROTOCOL,
        hostname: API_HOSTNAME,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
