import { Cloud } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

    const validateFile = (file: File) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            setError('Unsupported file type. Please upload PNG, JPG, JPEG, GIF, or SVG.');
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            setError('File size exceeds 5MB limit.');
            return false;
        }
        setError(null); // Clear any previous errors
        return true;
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            onFileSelect(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            onFileSelect(file);
        }
    };

    return (
        <div
            className={`w-full max-w-sm aspect-[2/1] rounded-lg border-2 border-dashed 
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            flex flex-col items-center justify-center p-6 cursor-pointer
            transition-colors duration-200 bg-gray-800`}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <Cloud className="w-12 h-12 text-gray-400 mb-4" />
            <div className="text-center">
                <p className="text-lg text-gray-400 mb-2">
                    Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                    SVG, PNG, JPG, JPEG, or GIF (Max 5MB)
                </p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUploader;
