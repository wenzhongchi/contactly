import { merge as webpackMerge } from "webpack-merge";
import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

import baseConfig from "./base.config";

const config = webpackMerge(baseConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "../../dist/launcher"),
        port: 4001,
        open: true,
        hot: true,
        index: path.join(__dirname, "../../dist/launcher/index.html"),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
    ],
});

export default config;
