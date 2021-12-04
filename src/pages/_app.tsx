import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { defaultFilesContext, FilesContext, FilesContextType } from '../hooks/files';
import theme from '../theme';

function ABN2CSV({ Component, pageProps }: AppProps) {
    const [fileState, setFileState] = useState<FilesContextType['fileState']>(defaultFilesContext.fileState);

    return (
        <ChakraProvider resetCSS theme={theme}>
            <FilesContext.Provider value={{ fileState, setFileState }}>
                <VStack height="100vh" width="100vw">
                    <DarkModeSwitch />
                    <Container height="100vh" d="flex" flexDirection="column" maxWidth="container.xl">
                        <Hero />

                        <Component {...pageProps} />

                        <Footer />
                    </Container>
                </VStack>
            </FilesContext.Provider>
        </ChakraProvider>
    );
}

export default ABN2CSV;
