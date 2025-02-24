import CodeMirror from "@uiw/react-codemirror";
import React, { useState, useRef } from 'react';


interface CodeEditorProps {
    value: string;
}

export const CodeEditor = ({ value }: CodeEditorProps) => {
    const [code, setCode] = useState(value);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const editorRef = useRef(null);

    const updateCode = (value: string) => {
        setCode(value);
    };

    const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = event.target.value as 'light' | 'dark';
        if (newTheme !== theme) {
            setTheme(newTheme as 'light' | 'dark');
        }
    };

    const commonClassNames = `flex px-4 py-2 ${theme === 'dark' ? 'text-gray-100 bg-gray-900' : 'bg-white'}`;

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <div className={`flex px-4 py-1 border-b ${theme === 'dark' ? 'text-gray-100 bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                <h5 className="">Code</h5>
                <select onChange={changeTheme} value={theme} className={`${commonClassNames} ml-auto`} >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>
            <CodeMirror
                className="h-full"
                ref={editorRef}
                value={code}
                onChange={updateCode}
                theme={theme}
                autoFocus={true}
                placeholder={'Write your code here...'}
            />
        </div>
    );
};