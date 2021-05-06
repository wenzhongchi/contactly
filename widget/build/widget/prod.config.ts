import { merge as webpackMerge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

import baseConfig from "./base.config"

const config = webpackMerge(baseConfig, {
  mode: "production",
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
});

export default config;
