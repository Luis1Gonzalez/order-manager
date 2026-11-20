/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hay otro package-lock.json en la carpeta superior: fija la raíz en este proyecto.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  experimental: {
    serverActions: { bodySizeLimit: "5mb" },
  },
};

export default nextConfig;
