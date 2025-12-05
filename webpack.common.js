import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from './package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const __libname = pkg.name.replace(/-/g, '_');

export default {
    target: 'web',
    entry: './src/index.tsx',

    output: {
        path: resolve(__dirname, 'dist'),
        filename: `${pkg.name}.bundle.js`,
        library: {
            name: __libname,
            type: 'window',
        },
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                ],
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.svg$/, type: 'asset/inline' },
            { test: /\.(png|jpe?g|gif)$/i, type: 'asset/inline' },
            { test: /\.(woff2?|eot|ttf|otf)$/i, type: 'asset/inline' },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },

    performance: {
        hints: false,
    },

    optimization: {
        splitChunks: false,
        runtimeChunk: false,
    },
};
