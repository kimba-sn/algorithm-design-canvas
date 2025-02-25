import { Box, Textarea, Flex } from '@chakra-ui/react';
import { CanvasSectionName } from './CanvasSectionName';

interface TextAreaEditorProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    fieldName: string;
}



export const TextAreaEditor = ({ value = '', onChange, fieldName }: TextAreaEditorProps) => {
    return (
        <Box borderWidth="1px" borderColor="gray.700">
            <CanvasSectionName fieldName={fieldName} />
            <Flex h="full" fontFamily="mono" fontSize="sm">
                <Textarea
                    value={value}
                    onChange={onChange}
                    flex="1"
                    p="4"
                    resize="none"
                    placeholder={`Enter ${fieldName}...`}
                />
            </Flex>
        </Box>
    );
};