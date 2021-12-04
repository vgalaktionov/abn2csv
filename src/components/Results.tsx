import { Box, Center, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useFiles } from '../hooks/files';
import { DownloadLink } from './DownloadLink';

export const Results = () => {
    const { processing, transactions, csvString } = useFiles();
    const name =
        transactions.length > 0
            ? `${transactions[0].date.toLocaleDateString('en-GB').replaceAll('/', '-')}_${transactions[
                  transactions.length - 1
              ].date
                  .toLocaleDateString('en-GB')
                  .replaceAll('/', '-')}-abn-transactions.csv`
            : '';
    return (
        <Box h="100%" p="6">
            {processing ? (
                <Center h="100%">
                    <Spinner />
                </Center>
            ) : (
                <VStack h="100%" justifyContent="center">
                    <Heading fontSize="xl">Your CSV file is ready for download:</Heading>
                    <Text>{`Transactions found: ${transactions.length}`}</Text>
                    <DownloadLink name={name} data={csvString!} />
                </VStack>
            )}
        </Box>
    );
};
