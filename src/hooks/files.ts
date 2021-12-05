import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import { parseFile, Transaction } from '../lib/parsers';
import { csvWriter } from '../lib/writer';

export interface FilesContextType {
    fileState: {
        files: File[];
        processing: boolean;
        error?: any;
        transactions: Transaction[];
        csvString?: string;
    };

    setFileState: (
        props: FilesContextType['fileState'] | ((p: FilesContextType['fileState']) => FilesContextType['fileState']),
    ) => void;
}

export const defaultFilesContext: FilesContextType = {
    fileState: { files: [], processing: false, transactions: [] },
    setFileState() {},
};

export const FilesContext = createContext<FilesContextType>(defaultFilesContext);

export const useFiles = () => {
    const {
        fileState: { files, processing, transactions, csvString, error },
        setFileState,
    } = useContext(FilesContext);
    const router = useRouter();

    const startProcessing = useCallback(async () => {
        setFileState((fs) => ({ ...fs, processing: true }));
        router.push('/results');

        try {
            const transactions = (await Promise.all(files.map(parseFile))).flat();
            if (transactions.length === 0) throw new Error('No transactions found!');
            transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
            const csvString = csvWriter(transactions);
            setFileState((fs) => ({ ...fs, transactions, csvString, processing: false }));
        } catch (error: unknown) {
            console.error(error);
            setFileState((fs) => ({ ...fs, error, processing: false }));
        }
    }, [files, setFileState, router]);

    const reset = useCallback(() => {
        setFileState(defaultFilesContext.fileState);
        router.push('/');
    }, [setFileState, router]);

    const setFiles = useCallback((files: File[]) => setFileState((fs) => ({ ...fs, files })), [setFileState]);

    return { files, processing, transactions, setFiles, startProcessing, reset, csvString, error };
};
