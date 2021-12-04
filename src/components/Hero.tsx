import {
    Box,
    Flex,
    Heading,
    HStack,
    Link as ChakraLink,
    ListItem,
    Text,
    UnorderedList,
    VStack,
} from '@chakra-ui/react';
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
        <Text textAlign="center">Convert ABN AMRO transaction exports to CSV in your browser.</Text>
        <Flex fontSize="sm" color="gray.500" width="100%" justifyContent="center">
            <HStack width="100%" mx="auto" justifyContent="center">
                <Text mr="9">Formats supported:</Text>
                <UnorderedList>
                    <ListItem>ABN AMRO checking/savings MT940 files</ListItem>
                    <ListItem>ABN AMRO ICS credit card PDF files</ListItem>
                </UnorderedList>
            </HStack>
        </Flex>
    </VStack>
);
