import { Box, Text } from "@chakra-ui/react"
import { useState } from "react";

interface Canvas {
  id: string;
  problem_name: string
  problem_url: string;
}

interface SidebarProps {
  canvases: Canvas[];
  currentCanvasIndex: number;
  addNewCanvas: (problemName: string, problemUrl: string) => void;
  switchCanvas: (index: number) => void;
  deleteCanvas: (index: number) => void;
  editCanvas: (index: number, problemName: string, problemUrl: string) => void;
  onClose?: () => void;
}

export const SidebarItems = ({ canvases, currentCanvasIndex, addNewCanvas, switchCanvas, deleteCanvas, editCanvas, onClose }: SidebarProps) => {
  const [problemName, setProblemName] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSave = () => {
    if (problemName.trim() === '') {
      alert('Problem name is mandatory');
      return;
    }
    if (editIndex !== null) {
      editCanvas(editIndex, problemName, problemUrl);
    } else {
      addNewCanvas(problemName, problemUrl);
    }
    setProblemName('');
    setProblemUrl('');
    setIsPopupOpen(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setProblemName(canvases[index].problem_name);
    setProblemUrl(canvases[index].problem_url);
    setIsPopupOpen(true);
  };

  const listCanvases = canvases.map((canvas, index) => (
    <div key={canvas.id} onClick={() => switchCanvas(index)} className={`p-4 cursor-pointer ${index === currentCanvasIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}>
      <div className="flex justify-between items-center">
        <div >
          {canvas.problem_name || `Canvas ${index + 1}`}
        </div>
        <div className="relative">
          <button className="focus:outline-none" onClick={() => setEditIndex(editIndex === index ? null : index)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
          {editIndex === index && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => handleEdit(index)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCanvas(index)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <Text fontSize="xs" px={4} py={2} fontWeight="bold">
        Menu
      </Text>
      <Box>{listCanvases}</Box>
    </>
  )
}

export default SidebarItems
