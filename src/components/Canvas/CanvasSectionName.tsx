import { Box, Text } from '@chakra-ui/react'

interface CanvasSectionNameProps {
    fieldName: string;
}



export const CanvasSectionName = ({ fieldName }: CanvasSectionNameProps) => {
    return (
        <Box px="4" py="2" borderBottomWidth="1px" borderColor="gray.700">
            <Text fontWeight="medium" fontSize="sm" color="gray.700">{fieldName}</Text>
        </Box>
    );
};