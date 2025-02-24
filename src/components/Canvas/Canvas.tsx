import { useState } from 'react';

import { CanvasHeader } from './CanvasHeader';
import { TextAreaEditor } from './TextAreaEditor';
import { CodeEditor } from './CodeEditor';
import { emptyCanvas } from '../../types';

interface Canvas {
    id: string;
    problem_name: string;
    problem_url: string;
    constraints: string;
    ideas: string;
    test_cases: string;
    code: string;
}


export const Canvas = () => {
    const [content, setContent] = useState(emptyCanvas);

    const handleChange = (section: keyof Canvas, value: string) => {
        setContent(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const editorFields: { name: keyof Canvas, label: string }[] = [
        { name: 'constraints', label: 'Constraints' },
        { name: 'ideas', label: 'Ideas' },
        { name: 'test_cases', label: 'Test Cases' }
    ];

    return (
        <div className="flex flex-col h-screen">
            <CanvasHeader selectedCanvas={emptyCanvas} />
            <div className="grid grid-cols-3 flex-1 h-[calc(100vh-64px)] overflow-hidden">
                {/* First column taking 1/3 of space */}
                <div className="col-span-1 overflow-y-auto">
                    <div className="grid grid-rows-3 h-full">
                        {editorFields.map(field => (
                            <TextAreaEditor
                                key={field.name}
                                value={content[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                fieldName={field.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Second column taking 2/3 of space */}
                {/* Code Editor */}
                <div className="col-span-2 h-full overflow-y-auto">
                    <CodeEditor
                        value={content.code || ''}
                    />
                </div>

            </div>
        </div>
    )

}