// next.config.js
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

// Detecta se é deploy para GitHub Pages
const isGithubPages = process.env.DEPLOY_ENV === 'GH_PAGES';

const nextConfig: NextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Configurações para GitHub Pages
  assetPrefix: isGithubPages ? '/nextjs-stack-portfolio/' : '',
  basePath: isGithubPages ? '/nextjs-stack-portfolio' : '',
  trailingSlash: true,

  webpack(config: Configuration, { isServer }: { isServer: boolean }) {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
