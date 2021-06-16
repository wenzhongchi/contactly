import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { themes } from "@contactly-ui/theme";
import { MediaContextProvider } from "@utils/media";

import "normalize.css";

import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <ThemeProvider theme={themes.light}>
        <MediaContextProvider>
            <Component {...pageProps} />
        </MediaContextProvider>
    </ThemeProvider>
);

export default MyApp;
