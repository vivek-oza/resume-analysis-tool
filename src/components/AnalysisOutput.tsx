import React from 'react';
import { CheckIcon, CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';

interface AnalysisOutputProps {
  analysisData: {
    matchScore: number;
    formatting: number;
    languageAssessment: number;
    readability: number;
    grammarCheck: number;
    projectStructure: number;
    experienceStructure: number;
    missingSkills: string[];
    keywordAlignment: string[];
    recommendations: string[];
  };
}

const ScoreIndicator: React.FC<{ score: number; maxScore: number }> = ({ score, maxScore }) => {
  const percentage = (score / maxScore) * 100;
  let color = 'bg-red-500';
  
  if (percentage >= 70) color = 'bg-green-500';
  else if (percentage >= 40) color = 'bg-yellow-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`${color} h-2.5 rounded-full`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const AnalysisOutput: React.FC<AnalysisOutputProps> = ({ analysisData }) => {
  const scoreSections = [
    { label: 'Formatting', score: analysisData.formatting, maxScore: 10 },
    { label: 'Language', score: analysisData.languageAssessment, maxScore: 10 },
    { label: 'Readability', score: analysisData.readability, maxScore: 10 },
    { label: 'Grammar', score: analysisData.grammarCheck, maxScore: 10 },
    { label: 'Project Structure', score: analysisData.projectStructure, maxScore: 10 },
    { label: 'Experience Structure', score: analysisData.experienceStructure, maxScore: 10 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Resume Analysis Results</h2>
        <div className="flex items-center">
          <div 
            className="text-5xl font-extrabold mr-4"
            style={{ 
              color: analysisData.matchScore >= 70 ? '#10B981' : 
                     analysisData.matchScore >= 40 ? '#F59E0B' : '#EF4444' 
            }}
          >
            {analysisData.matchScore}%
          </div>
          <div>
            <p className="font-semibold">Job Description Match</p>
            <p className="text-sm text-gray-600">
              {analysisData.matchScore >= 70 
                ? 'Excellent match! Your resume strongly aligns with the job description.' 
                : analysisData.matchScore >= 40 
                  ? 'Good potential. Consider some improvements.' 
                  : 'Significant improvements needed.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Detailed Scoring</h3>
        {scoreSections.map(({ label, score, maxScore }) => (
          <div key={label} className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{label}</span>
              <span>{score}/{maxScore}</span>
            </div>
            <ScoreIndicator score={score} maxScore={maxScore} />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Missing Skills</h3>
        {analysisData.missingSkills.length > 0 ? (
          <ul className="space-y-2">
            {analysisData.missingSkills.map((skill, index) => (
              <li key={index} className="flex items-center text-sm text-yellow-700">
                <CrossCircledIcon className="mr-2" /> {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-green-600 flex items-center">
            <CheckIcon className="mr-2" /> No significant skills missing
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Keyword Alignment</h3>
        {analysisData.keywordAlignment.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {analysisData.keywordAlignment.map((keyword, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600 flex items-center">
            <InfoCircledIcon className="mr-2" /> No specific keywords identified
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
        <ul className="space-y-2">
          {analysisData.recommendations.map((recommendation, index) => (
            <li 
              key={index} 
              className="text-sm text-gray-700 flex items-start"
            >
              <InfoCircledIcon className="mr-2 mt-1 flex-shrink-0" /> 
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisOutput; 