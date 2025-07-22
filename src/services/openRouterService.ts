import axios from 'axios';

// Declare import.meta.env type
declare global {
  interface ImportMetaEnv {
    readonly VITE_OPENROUTER_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// List of available AI models from OpenRouter
export const AI_MODELS = [
  { 
    id: 'anthropic/claude-2', 
    name: 'Claude 2 (Anthropic)', 
    description: 'Advanced AI with strong reasoning capabilities' 
  },
  { 
    id: 'openai/gpt-3.5-turbo', 
    name: 'GPT-3.5 Turbo (OpenAI)', 
    description: 'Balanced performance and cost' 
  },
  { 
    id: 'google/palm-2', 
    name: 'PaLM 2 (Google)', 
    description: 'Versatile language model' 
  },
  { 
    id: 'mistralai/mistral-small-3.2-24b-instruct:free', 
    name: 'Mistral Small 3.2 24b instruct (Mistral/Free)', 
    description: 'Versatile language model' 
  },
  { 
    id: 'qwen/qwen2.5-vl-72b-instruct:free', 
    name: 'Qwen 2.5 VL 72b instruct (Qwen/Free)', 
    description: 'Versatile language model' 
  }
];

interface AnalysisRequest {
  resume: string;
  jobDescription: string;
  selectedModel: string;
}

interface AnalysisResponse {
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
}

// Define the shape of the OpenRouter API response
interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    }
  }>;
}

export class OpenRouterService {
  private static API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  static async analyzeResume(request: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const response = await axios.post(this.API_URL, {
        model: request.selectedModel,
        messages: [
          {
            role: 'system',
            content: `You are an expert resume and job description analyzer. 
            Provide a comprehensive analysis of the resume in context of the job description.
            Return a structured JSON response with the following keys:
            - matchScore (0-100)
            - formatting (0-10)
            - languageAssessment (0-10)
            - readability (0-10)
            - grammarCheck (0-10)
            - projectStructure (0-10)
            - experienceStructure (0-10)
            - missingSkills (array of strings)
            - keywordAlignment (array of strings)
            - recommendations (array of strings)`
          },
          {
            role: 'user',
            content: `Resume:
            ${request.resume}

            Job Description:
            ${request.jobDescription}`
          }
        ],
        response_format: { type: 'json_object' }
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      // Type assert the response and parse the AI response
      const apiResponse = response.data as OpenRouterResponse;
      const analysisResult = JSON.parse(apiResponse.choices[0].message.content);
      return analysisResult;
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw new Error('Failed to analyze resume. Please try again.');
    }
  }
} 