import {
    Box,
    Flex,
    Heading,
    Center,
    Text,
} from "@chakra-ui/react";
import AddCanvas from "./AddCanvas";
import { CanvasActionsMenu } from "./CanvasActionsMenu";
import { Canvas } from "../../types";

interface SidebarProps {
    canvases: Canvas[];
    currentCanvasIndex: number;
    addNewCanvas: (problemName: string, problemUrl: string) => void;
    switchCanvas: (index: number) => void;
    deleteCanvas: (index: number) => void;
    editCanvas: (index: number, problemName: string, problemUrl: string) => void;
}

export const Sidebar = ({ canvases, currentCanvasIndex, addNewCanvas, switchCanvas, deleteCanvas, editCanvas }: SidebarProps) => {

    return (
        <Flex direction="column" w="64" h="100vh" bg="gray.100" borderRightWidth="1px" borderColor="gray.200">
            {/* Header */}
            <Box px="4" py="2" borderWidth="1px" borderColor="gray.700">
                <Center><Heading  color="gray.800">Canvases</Heading></Center>
            </Box>

            {/* Add New Button */}
            <Box w="100%" p="4">
                <AddCanvas addNewCanvas={addNewCanvas} />
            </Box>

            {/* Canvas List */}
            {canvases.length > 0 && (
                <Box flex="1" overflowY="auto">
                    {canvases.map((canvas, index) => (
                        <Box key={canvas.id} p="4" cursor="pointer" bg={index === currentCanvasIndex ? 'blue.100' : 'transparent'} _hover={{ bg: 'gray.200' }} onClick={() => switchCanvas(index)}>
                            <Flex justify="space-between" align="center">
                                <Text>{canvas.problem_name || `Canvas ${index + 1}`}</Text>
                                <Box>
                                    <CanvasActionsMenu updateCanvas={editCanvas} deleteCanvas={deleteCanvas} canvas={canvas} />
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </Box>
            )}
        </Flex>
    );
};