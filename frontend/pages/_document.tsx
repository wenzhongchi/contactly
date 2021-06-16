import React from "react";
import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
    DocumentInitialProps,
} from "next/document";

import { mediaStyles } from "@utils/media";

class MyDocument extends Document {
    static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    };

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
