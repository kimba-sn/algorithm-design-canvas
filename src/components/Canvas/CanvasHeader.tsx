import { CanvasPublic } from '../../client/models'

export const CanvasHeader = ( selectedCanvas: CanvasPublic) => {
    return (
        <div className="border-b border-gray-200">
            <div className="flex justify-between items-center bg-white px-4 py-2">
                <h1 className="text-lg font-medium text-gray-600">
                    The Algorithm Design Canvas
                </h1>
                <a
                    href={selectedCanvas?.problem_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                >
                    {selectedCanvas?.problem_name || 'Problem Name'}
                </a>
            </div>
        </div>
    );
};

export default CanvasHeader;