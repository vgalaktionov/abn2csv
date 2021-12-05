import { Box, HStack, Icon, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineRollback } from 'react-icons/ai';
import { ExternalLink } from '../components/ExternalLink';

const AboutPage = () => {
    return (
        <VStack height="100%" justifyContent="space-between">
            <Link href="/" passHref>
                <ChakraLink color="teal.500" pt="6">
                    <HStack>
                        <Icon as={AiOutlineRollback} />
                        <Text>Back To Main Page</Text>
                    </HStack>
                </ChakraLink>
            </Link>
            <Box>
                <Text fontWeight="bold">Why did you build this?</Text>
                <Text pt="3">
                    The default export formats provided by ABN AMRO and their credit card partner ICS are not very
                    useful.
                    <br />
                    This app converts them into a simple CSV that can be used with any personal finance manager or
                    accounting software.
                </Text>
                <Text fontWeight="bold" pt="9">
                    How does this work?
                </Text>
                <Text pt="3">
                    For MT940 format statements, they are parsed using
                    <ExternalLink href="https://www.npmjs.com/package/mt940-js">mt940-js</ExternalLink>
                    .
                    <br />
                    In case of PDF files, text is extracted using
                    <ExternalLink href="https://www.npmjs.com/package/pdfjs-dist">pdf.js</ExternalLink>
                    and parsed using regular expressions.
                    <br />
                    The UI of the application is made using
                    <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>
                    and
                    <ExternalLink href="https://chakra-ui.com">Chakra UI</ExternalLink>, and the whole thing is hosted
                    on
                    <ExternalLink href="https://vercel.com">Vercel</ExternalLink>.
                </Text>
                <Text fontWeight="bold" pt="9">
                    What are you doing with my data?
                </Text>
                <Text pt="3">
                    Absolutely nothing! All processing happens inside your own browser.
                    <br />
                    Feel free to check the network tab of the browser developer tools, or the Github repository, to
                    verify 🙂.
                </Text>
            </Box>
            <Box></Box>
        </VStack>
    );
};

export default AboutPage;
