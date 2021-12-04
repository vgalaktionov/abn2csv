const CopyPlugin = require('copy-webpack-plugin');
const { join } = require('path');

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.js'),
                        to: join(__dirname, 'public/pdf.worker.js'),
                    },
                ],
            }),
        );

        // Important: return the modified config
        return config;
    },
};
