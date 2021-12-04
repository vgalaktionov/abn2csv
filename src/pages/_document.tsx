import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

// @ts-ignore
export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <ColorModeScript initialColorMode="system" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
