interface TextAreaEditorProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    fieldName: string;
}



export const TextAreaEditor = ({ value = '', onChange, fieldName }: TextAreaEditorProps) => {
    return (
        <div className="bg-white">
            <div className="px-4 py-2 border border-gray-700">
                <h5 className="font-medium text-sm text-gray-600">{ fieldName }</h5>
            </div>
            <div className="flex h-full bg-white font-mono text-sm">
                {/* Text input */}
                <textarea
                    value={value}
                    onChange={onChange}
                    className="flex-1 p-4 focus:outline-none leading-6 resize-none"
                    placeholder={`Enter ${fieldName}...`}
                />
            </div>
        </div>
    );
};