import React, { useState } from 'react';
import {
    Flex,
    Button,
    Input,
    Spinner
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const UploadButton = ({ handleChange }) => {
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleUpload = (e) => {
        setFileUploaded(true);
        handleChange(e);
    }

    return (
        <Flex
            width="400px"
            justifyContent="center"
            alignItems="center"
            margin={5}
        >
            <Button
                leftIcon={fileUploaded ? <Spinner speed="0.5s" /> : <ArrowUpIcon />}
            >
                <label htmlFor="file-upload">
                Upload .csv
                </label>
            </Button>
            <Input id="file-upload" type="file" onChange={(e) => handleUpload(e)} display="none" accept=".csv" />
        </Flex>
    )
}

export default UploadButton;