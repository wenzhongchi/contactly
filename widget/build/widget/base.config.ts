import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: "development",
    entry: "./src/widget/index.ts",
    output: {
        filename: "./widget.js",
        path: path.resolve(__dirname, "../../dist/widget"),
        library: "widget",
        libraryTarget: "umd",
        libraryExport: "default",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                        plugins: ["@babel/transform-runtime"],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@type": path.resolve(__dirname, "../../../frontend/types"),
            "@constants": path.resolve(__dirname, "../../src/constants"),
            "@components": path.resolve(__dirname, "../../../frontend/components"),
            "@icons": path.resolve(__dirname, "../../../frontend/icons"),
        },
    },
};

export default config;
