import { Box, Center, Heading, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useFiles } from '../hooks/files';
import { DownloadLink } from './DownloadLink';

export const Results = () => {
    const { processing, transactions, csvString } = useFiles();
    const name =
        transactions.length > 0
            ? `${new Date().toLocaleString('en-GB').replaceAll('/', '-')}-abn-transactions.csv`
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
                    <DownloadLink name={name} data={csvString!} />
                    <Text pt="6">Preview (total transactions: {transactions.length})</Text>
                    <Table fontSize="xs">
                        <Thead>
                            <Tr>
                                <Th>id</Th>
                                <Th>date</Th>
                                <Th>description</Th>
                                <Th>amount</Th>
                                <Th>currency</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.slice(0, 5).map((tr) => (
                                <Tr key={tr.id}>
                                    <Td>{tr.id.slice(0, 6)}</Td>
                                    <Td>{tr.date.toLocaleDateString('en-GB')}</Td>
                                    <Td>
                                        {tr.description.length > 40
                                            ? tr.description.slice(0, 40) + '...'
                                            : tr.description}
                                    </Td>
                                    <Td>{tr.amount.toFixed(2)}</Td>
                                    <Td>{tr.currency}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </VStack>
            )}
        </Box>
    );
};
