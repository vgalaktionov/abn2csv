import { Button, Center, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AiOutlineRollback } from 'react-icons/ai';
import { Results } from '../components/Results';
import { useFiles } from '../hooks/files';

const ResultsPage = () => {
    const { reset, error, files } = useFiles();
    const router = useRouter();
    useEffect(() => {
        if (files.length === 0) router.push('/');
    }, [files]);

    return (
        <VStack height="100%">
            <Center height="100%">{error ? <Text>{error.toString()}</Text> : <Results />}</Center>
            <HStack>
                <Button onClick={reset} mx="auto" mt="3" leftIcon={<Icon as={AiOutlineRollback} />}>
                    Convert More Files
                </Button>
            </HStack>
            <Text fontSize="sm" pt="9" textAlign="center">
                Looking for a personal finance manager to work with these CSVs? Try the great &nbsp;
                <Link href="https://lunchmoney.app/?refer=kttiuizd" isExternal color="rgb(251, 183, 0)">
                    Lunch Money
                </Link>
                !
                <br />
                That link will give you an extended trial of a month.
            </Text>
        </VStack>
    );
};

export default ResultsPage;
