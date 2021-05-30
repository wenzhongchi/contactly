import { merge as webpackMerge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import baseConfig from "./base.config";

const config = webpackMerge(baseConfig, {
    mode: "production",
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
});

export default config;
