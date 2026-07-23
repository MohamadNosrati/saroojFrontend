import createNextIntlPlugin from "next-intl/plugin";

const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND_URL);
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Turbopack configuration (development only)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              // Common SVGR options – adjust as needed
              icon: true, // makes SVG fit a 1em × 1em box
              dimensions: false, // strips width/height attributes
            },
          },
        ],
        as: "*.js", // output as JavaScript module
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", ""), // "http" or "https"
        hostname: backendUrl.hostname,
        port: backendUrl.port || "",
      },
    ],
  },

  // Webpack fallback (used for production builds)
  webpack(config) {
    // Find the default rule that handles SVG imports (asset/resource)
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );
    if (fileLoaderRule) {
      // Prevent the default rule from processing SVGs
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add SVGR rule for all .svg imports
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            dimensions: false,
          },
        },
      ],
    });

    return config;
  },
};

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");

export default withNextIntl(nextConfig);
