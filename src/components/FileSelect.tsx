import { Center, Text } from '@chakra-ui/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../hooks/files';

interface FileSelectSchema {
    file?: File;
}

export const FileSelect = () => {
    const { files, setFiles } = useFiles();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: setFiles });

    return (
        <Center
            {...getRootProps()}
            border="3px dashed"
            height="100%"
            width="100%"
            borderColor="gray.600"
            borderRadius="lg"
            mt="6"
        >
            <input {...getInputProps()} required />
            {isDragActive ? (
                <Text>Drop your files here...</Text>
            ) : files.length > 0 ? (
                <Text>{files.map((f) => f.name).join('\n')}</Text>
            ) : (
                <Text>Drop your files here, or click to select files...</Text>
            )}
        </Center>
    );
};
