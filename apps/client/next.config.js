//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // For Mantine Un-comment this
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },

  output: 'standalone',
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  async rewrites() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const GLOBAL_PREFIX = process.env.NEXT_PUBLIC_GLOBAL_PREFIX;
    const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

    return [
      {
        source: '/api/external/:path*',
        destination: `${API_BASE_URL}/${GLOBAL_PREFIX}/${API_VERSION}/:path*`, // Proxy to Nest backend
      },
    ];
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
