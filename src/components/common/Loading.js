import * as React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export default function Loading() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
                thickness='5px'
                speed='0.65s'
                emptyColor='gray.200'
                color='white.500'
                size='xl'
            />
        </Box>
    );
}
