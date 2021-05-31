import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: "development",
    entry: "./src/launcher/index.tsx",
    output: {
        filename: "./launcher.js",
        path: path.resolve(__dirname, "../../dist"),
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
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@type": path.resolve(__dirname, "../../src/types"),
            "@constants": path.resolve(__dirname, "../../src/constants"),
            "@components": path.resolve(__dirname, "../../src/components"),
            "@icons": path.resolve(__dirname, "../../src/icons"),
        },
    },
};

export default config;
