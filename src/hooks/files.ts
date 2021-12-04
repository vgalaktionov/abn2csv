import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import { parseFile, Transaction } from '../lib/parsers';

export interface FilesContextType {
    fileState: {
        files: File[];
        processing: boolean;
        error?: any;
        transactions: Transaction[];
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
        fileState: { files, processing, transactions },
        setFileState,
    } = useContext(FilesContext);
    const router = useRouter();

    const startProcessing = useCallback(async () => {
        setFileState((fs) => ({ ...fs, processing: true }));
        router.push('/results');

        try {
            const transactions = (await Promise.all(files.map((f) => parseFile(f.type, f)))).flat();
            setFileState((fs) => ({ ...fs, transactions, processing: false }));
        } catch (error: unknown) {
            setFileState((fs) => ({ ...fs, error, processing: false }));
        }
    }, [setFileState]);

    const reset = useCallback(() => setFileState(defaultFilesContext.fileState), [setFileState]);

    const setFiles = useCallback((files: File[]) => setFileState((fs) => ({ ...fs, files })), [setFileState]);

    return { files, processing, transactions, setFiles, startProcessing, reset };
};
