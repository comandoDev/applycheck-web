/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
        domains: ['denunc.s3.sa-east-1.amazonaws.com'],
      },
}

module.exports = nextConfig
