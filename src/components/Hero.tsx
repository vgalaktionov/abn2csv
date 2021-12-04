import { Flex, Heading } from '@chakra-ui/react';

export const Hero = () => (
    <Flex
        justifyContent="center"
        alignItems="center"
        // height="100vh"
        bgGradient="linear(to-r, rgb(0, 96, 95), rgb(254, 209, 0), #718096)"
        bgClip="text"
    >
        <Heading fontSize="6vw">ABN 2 CSV</Heading>
    </Flex>
);
