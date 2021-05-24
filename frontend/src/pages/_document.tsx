// document.tsx
import { ColorModeScript, theme } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import breadTheme from '../../styles/breadtheme';


class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    // Note: Font stylesheet links are imported in head section
    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="polybread is here my dude" />
                    <meta property="og:description" content="polybread is here my dude" />
                </Head>

                <body>
                    <ColorModeScript initialColorMode={breadTheme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;


