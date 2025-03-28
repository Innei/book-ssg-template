import { bootstarp } from "./plugins/json-watcher.mjs"

if (process.env.NODE_ENV === "development") {
  bootstarp()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 1024 * 1024, // Minimum number of characters
      }),
    )

    config.module.rules.push({
      test: /\.md$/i,
      // use: 'raw-loader',
      type: "asset/source",
    })
    return config
  },
}

export default nextConfig
