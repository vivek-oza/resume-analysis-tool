import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ALLOWED_FILE_TYPES = ['.pdf', '.docx', '.doc'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      setError(`Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }

    // Clear any previous errors
    setError(null);
    
    // Pass file to parent component
    onFileUpload(file);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxSize: MAX_FILE_SIZE
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer 
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
        transition-colors duration-200`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive 
          ? 'Drop your resume here' 
          : 'Drag and drop your resume, or click to select a file'}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: PDF, DOCX, DOC (max 5MB)
      </p>
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUpload; 