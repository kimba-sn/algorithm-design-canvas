import { useState, useEffect } from 'react';
import { Grid, Flex, GridItem } from '@chakra-ui/react';

import { CanvasHeader } from './CanvasHeader';
import { TextAreaEditor } from './TextAreaEditor';
import { Sidebar } from './Sidebar';
import { CodeEditor } from './CodeEditor';
import { emptyCanvas } from '../../types';

interface Canvas {
    id: number;
    problem_name: string;
    problem_url: string;
    constraints: string;
    ideas: string;
    test_cases: string;
    code: string;
}

const LOCAL_STORAGE_KEY = 'canvases';

export const Canvas = () => {
    const [canvases, setCanvases] = useState<Canvas[]>(() => {
        const savedCanvases = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedCanvases ? JSON.parse(savedCanvases) : [emptyCanvas];
    });
    const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(canvases));
    }, [canvases]);

    const handleChange = (section: keyof Canvas, value: string) => {
        setCanvases(prevCanvases => {
            const updatedCanvases = [...prevCanvases];
            updatedCanvases[currentCanvasIndex] = {
                ...updatedCanvases[currentCanvasIndex],
                [section]: value
            };
            return updatedCanvases
        });
    };

    const addNewCanvas = (problemName: string, problemUrl: string) => {
        const newCanvas: Canvas = {
            ...emptyCanvas,
            id: Date.now(),
            problem_name: problemName,
            problem_url: problemUrl
        };
        setCanvases(prevCanvases => [...prevCanvases, newCanvas]);
        setCurrentCanvasIndex(canvases.length);
    };

    const deleteCanvas = (id: number) => {
        setCanvases(prevCanvases => {
            const updatedCanvases = prevCanvases.filter(canvas => canvas.id !== id);
            if (updatedCanvases.length === 0) {
                return [emptyCanvas];
            }
            if (currentCanvasIndex >= updatedCanvases.length) {
                setCurrentCanvasIndex(updatedCanvases.length - 1);
            }
            return updatedCanvases;
        });
    };

    const editCanvas = (id: number, problemName: string, problemUrl: string) => {
        console.log(`Editing canvas with id ${id} with name ${problemName} and URL ${problemUrl}`);
        setCanvases(prevCanvases => {
            const canvasIndex = prevCanvases.findIndex(canvas => canvas.id === id);
            if (canvasIndex !== -1) {
                const updatedCanvases = [...prevCanvases];
                updatedCanvases[canvasIndex] = {
                    ...updatedCanvases[canvasIndex],
                    problem_name: problemName,
                    problem_url: problemUrl
                };
                return updatedCanvases;
            }
            return prevCanvases;
        });
    }

    const switchCanvas = (index: number) => {
        setCurrentCanvasIndex(index)
    }

    const currentCanvas = canvases[currentCanvasIndex]

    const editorFields: { name: keyof Canvas, label: string }[] = [
        { name: 'constraints', label: 'Constraints' },
        { name: 'ideas', label: 'Ideas' },
        { name: 'test_cases', label: 'Test Cases' }
    ];

    return (
        <Flex h="100vh">
            <Sidebar
                canvases={canvases}
                currentCanvasId={currentCanvasIndex}
                addNewCanvas={addNewCanvas}
                switchCanvas={switchCanvas}
                deleteCanvas={deleteCanvas}
                editCanvas={editCanvas}
            />
            <Flex flex="1" direction="column">
                <CanvasHeader selectedCanvas={currentCanvas} />
                <Grid templateColumns="1fr 3fr" flex="1" h="calc(100vh - 64px)">
                    {/* First column taking 1/3 of space */}
                    <GridItem>
                        <Grid templateRows="repeat(3, 1fr)" h="full">
                            {editorFields.map(field => (
                                <TextAreaEditor
                                    key={field.name}
                                    value={String(currentCanvas[field.name]) || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    fieldName={field.label}
                                />
                            ))}
                        </Grid>
                    </GridItem>

                    {/* Second column taking 2/3 of space */}
                    {/* Code Editor */}
                    <GridItem className="col-span-2 h-full overflow-y-auto">
                        <CodeEditor
                            value={currentCanvas.code || ''}
                            onChange={(value) => handleChange('code', value)}
                        />
                    </GridItem>
                </Grid>
            </Flex>
        </Flex>
    );
};