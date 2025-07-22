import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisOutput from './components/AnalysisOutput';
import { OpenRouterService, AI_MODELS } from './services/openRouterService';

const App: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setResume(file);
  };

  const handleJobDescriptionChange = (description: string) => {
    setJobDescription(description);
  };

  const handleAnalyze = async () => {
    // Validate inputs
    if (!resume) {
      setError('Please upload a resume');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    // Reset previous states
    setError(null);
    setIsLoading(true);

    try {
      // Read resume file content
      const resumeText = await resume.text();

      // Call OpenRouter service
      const result = await OpenRouterService.analyzeResume({
        resume: resumeText,
        jobDescription,
        selectedModel
      });

      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Resume Analysis Tool
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">1. Upload Resume</h2>
              <FileUpload onFileUpload={handleFileUpload} />
              {resume && (
                <p className="text-sm text-gray-600 mt-2">
                  Uploaded: {resume.name}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">2. Job Description</h2>
              <JobDescriptionInput 
                onJobDescriptionChange={handleJobDescriptionChange} 
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">3. AI Model</h2>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {AI_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} - {model.description}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isLoading || !resume || !jobDescription.trim()}
              className={`w-full p-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
                isLoading || !resume || !jobDescription.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Resume'}
            </button>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">4. Analysis Results</h2>
            {analysisResult ? (
              <AnalysisOutput analysisData={analysisResult} />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                Your analysis results will appear here after submission
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 