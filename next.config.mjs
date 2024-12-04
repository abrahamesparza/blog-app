/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'users-pfp.s3.amazonaws.com',
            pathname: '/profiles/**',
        },
    ],
    },
};

export default nextConfig;
