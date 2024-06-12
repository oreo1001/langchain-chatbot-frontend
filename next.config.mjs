/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
        // formats: ['image/webp'],
        // minimumCacheTTL: 31536000,
        // output: 'standalone',
    },
    reactStrictMode: false,
    swcMinify: true,
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: process.env.NEXT_PUBLIC_THIS_APP_URL + '/:path*',
    //         },
    //     ]
    // },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value:
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
