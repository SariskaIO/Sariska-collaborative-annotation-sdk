
const { EnvCmd } = require('env-cmd');
const path = require('path');
const webpack = require('webpack');

// const env =  EnvCmd({envFile: {
//     filePath: `.env.${process.env.NODE_ENV || 'development'}`, // Path to your .env file
// }});

module.exports  = {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 3000,
        },
        // plugins: [
        //     new webpack.DefinePlugin({
        //       'process.env': JSON.stringify(env),
        //     }),
        //   ]
};
