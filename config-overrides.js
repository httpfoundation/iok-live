const webpack = require('webpack');
module.exports = function override(config, env) {
    //do stuff with the webpack config...

    config.resolve.fallback = {
        http: require.resolve('http-browserify'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
		zlib: require.resolve("browserify-zlib"),
		path: require.resolve("path-browserify"),
		querystring: require.resolve("querystring-es3"),
		url: require.resolve("url/"),
		assert: require.resolve("assert/"),
		stream: require.resolve("stream-browserify"),
		crypto: require.resolve("crypto-browserify"),
		fs: false
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}