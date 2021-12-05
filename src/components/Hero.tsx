import { Box, Heading, Link as ChakraLink, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export const Hero = () => (
    <VStack display="flex" justifyContent="center" alignItems="center" width="100%">
        <Box bgGradient="linear(to-r, rgb(0, 96, 95), rgb(254, 209, 0), #718096)" bgClip="text">
            <Link href="/" passHref>
                <ChakraLink>
                    <Heading fontSize="6vw">ABN 2 CSV</Heading>
                </ChakraLink>
            </Link>
        </Box>
    </VStack>
);
