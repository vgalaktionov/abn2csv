import { Box, Button, HStack } from '@chakra-ui/react';
import { FileSelect } from '../components/FileSelect';
import { useFiles } from '../hooks/files';

const Index = () => {
    const { startProcessing, setFiles } = useFiles();

    return (
        <Box height="100%">
            <FileSelect />
            <HStack>
                <Button onClick={startProcessing} mx="auto" mt="3">
                    Convert Files
                </Button>
            </HStack>
        </Box>
    );
};

export default Index;
