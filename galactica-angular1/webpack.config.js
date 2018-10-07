const webpack = require('webpack');

module.exports = {
  entry: './src/js/mainApp.js'
};

module.exports = {
    context: __dirname,
    entry: {
        app: './src/mainApp.js',
        vendor: ['angular']
    },
    output: {
        path: __dirname + '/dist/js',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};