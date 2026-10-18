/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  generateBuildId: () => 'build-' + Date.now(),
};

export default nextConfig;
