import React, { useState, ChangeEvent } from 'react';

interface JobDescriptionInputProps {
  onJobDescriptionChange: (description: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onJobDescriptionChange }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const MAX_CHARACTERS = 5000;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    
    // Limit input to MAX_CHARACTERS
    if (inputText.length <= MAX_CHARACTERS) {
      setJobDescription(inputText);
      onJobDescriptionChange(inputText);

      // Update character count
      setCharacterCount(inputText.length);

      // Update word count (trim to remove leading/trailing whitespace)
      const words = inputText.trim().split(/\s+/);
      setWordCount(inputText.trim() ? words.length : 0);
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        value={jobDescription}
        onChange={handleInputChange}
        placeholder="Paste the full job description here. This helps us provide tailored resume recommendations."
        className="w-full p-3 border rounded-lg min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Job Description Input"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>
          Characters: {characterCount}/{MAX_CHARACTERS}
        </span>
        <span>
          Words: {wordCount}
        </span>
      </div>
      {characterCount === MAX_CHARACTERS && (
        <p className="text-red-500 text-xs mt-1">
          Maximum character limit reached
        </p>
      )}
    </div>
  );
};

export default JobDescriptionInput; 