/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['az', 'ru'],
    defaultLocale: 'az',
    localeDetection: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
