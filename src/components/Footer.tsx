import { HStack, Icon, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { AiFillInfoCircle, AiOutlineGithub } from 'react-icons/ai';

export const Footer = () => (
    <VStack as="footer" py="6" display="flex" textAlign="justify" justifyContent="center">
        <HStack my="6">
            <Link href="/about" passHref>
                <ChakraLink color="blue.500">
                    <HStack>
                        <Icon as={AiFillInfoCircle} />
                        <Text>About</Text>
                    </HStack>
                </ChakraLink>
            </Link>
            <Text> - </Text>
            <ChakraLink to="/about" color="blue.500">
                <HStack>
                    <Icon as={AiOutlineGithub} />
                    <Text>Github</Text>
                </HStack>
            </ChakraLink>
        </HStack>
        <Text color="gray.500">Made with 🤨 by Vadim Galaktionov.</Text>
        <Text color="gray.500" fontSize="xs">
            ABN AMRO and ICS are registered trademarks of their respective owners. The author is not associated with
            them in any way.
        </Text>
    </VStack>
);
