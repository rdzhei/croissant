const path = require('path');

module.exports = {
    root: 'src',
    build: {
        outDir: '../dist'
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
}