import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

// @ts-ignore
export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    <title>ABN2CSV</title>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <meta name="description" content="Convert ABN AMRO MT940 and ICS PDF statements to CSV" />
                    <meta name="keywords" content="ABN AMRO, transactions, export, ICS, account, credit card, csv" />
                    <meta name="author" content="Vadim Galaktionov" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode="system" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
