import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisOutput from './components/AnalysisOutput';
import { LinkedinLogoIcon, GithubLogoIcon, HeartIcon } from "@phosphor-icons/react";
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
    <>
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
                className={`w-full p-3 rounded-lg text-white font-semibold transition-colors duration-200 ${isLoading || !resume || !jobDescription.trim()
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
      <footer className="bg-[#C9EBFF] backdrop-blur-sm text-[#000A16] py-14 px-4 mt-8 font-sans">
        <div className="flex flex-col gap-14 font-schibsted-grotesk max-w-[1100px] mx-auto">

          <div className="font-medium md:text-4xl text-xl flex flex-col space-y-2">
            <div className="">A tool made by</div>
            <div className="">
              Vivek Oza
            </div>
          </div>
          <div>
            <div className="md:text-2xl text-base">
              Developed and managed with <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ff0066" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg> by Vivek Oza.
            </div>
            <div className="flex justify-start md:text-xl text-base gap-4 mt-2">
              <a
                href="www.linkedin.com/in/vivek-oza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"></path></svg> LinkedIn
              </a>
              <a
                href="https://github.com/vivek-oza/resume-analysis-tool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"></path></svg>
                Github
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>

  );
};

export default App; 