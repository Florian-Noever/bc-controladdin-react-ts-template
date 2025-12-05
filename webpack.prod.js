import { merge } from 'webpack-merge';
import { EsbuildPlugin } from 'esbuild-loader';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'production',
    devtool: false,

    plugins: [
        new LicenseWebpackPlugin({
            outputFilename: 'licenses.txt',
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new EsbuildPlugin({
                legalComments: 'none',
                keepNames: true,
            }),
        ],
    },
});
