import { Button, Flex, HStack, Icon, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { AiOutlineSync } from 'react-icons/ai';
import { FileSelect } from '../components/FileSelect';
import { useFiles } from '../hooks/files';

const IndexPage = () => {
    const { startProcessing, files } = useFiles();

    return (
        <VStack height="100%">
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
            <FileSelect />
            <HStack>
                <Button
                    onClick={startProcessing}
                    mx="auto"
                    mt="3"
                    colorScheme="green"
                    disabled={files.length === 0}
                    leftIcon={<Icon as={AiOutlineSync} />}
                >
                    Convert Files
                </Button>
            </HStack>
        </VStack>
    );
};

export default IndexPage;
