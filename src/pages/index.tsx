import { Button, HStack, Icon, VStack } from '@chakra-ui/react';
import { AiOutlineSync } from 'react-icons/ai';
import { FileSelect } from '../components/FileSelect';
import { useFiles } from '../hooks/files';

const IndexPage = () => {
    const { startProcessing, files } = useFiles();

    return (
        <VStack height="100%">
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
