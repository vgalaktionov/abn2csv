import { Link } from '@chakra-ui/react';
import { useCallback } from 'react';

export const DownloadLink = (props: { name: string; data: string }) => {
    const download = useCallback(() => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(props.data));
        element.setAttribute('download', props.name);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }, [props]);

    return (
        <Link onClick={download} download={props.name} fontWeight="bold" color="teal.500">
            {props.name}
        </Link>
    );
};
