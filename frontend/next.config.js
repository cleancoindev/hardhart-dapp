const withImages = require("next-images");

const nextConfig = {
    webpack: (config, { isServer }) => {
        // fix dependency for 'fs' module

        if (!isServer) {
            config.node = {
                fs: "empty",
            };
        }

        return config;
    },
    target: "serverless",
};

module.exports = withImages(nextConfig);