import { Box, Spinner } from '@chakra-ui/react';
import { useFiles } from '../hooks/files';

const Results = () => {
    const { processing, transactions } = useFiles();
    return <Box>{processing ? <Spinner /> : `Your files are ready: ${JSON.stringify(transactions)}`}</Box>;
};

export default Results;
