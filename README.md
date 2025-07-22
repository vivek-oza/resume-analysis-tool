# Resume Analysis Tool

## Overview
A comprehensive web application that helps job seekers improve their resumes by providing AI-powered analysis and recommendations.

## Features
- Resume file upload (PDF, DOCX, DOC)
- Job description input
- AI-powered resume analysis
- Detailed scoring and insights
- Multiple AI model support

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

## Setup

1. Clone the repository
```bash
git clone https://github.com/vivek-oza/resume-analysis-tool.git
cd resume-analysis-tool
```
2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
- Add your OpenRouter API key to `.env`

4. Run the application
```bash
npm run dev

## Deployment to Vercel
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy the project:
   ```bash
   vercel
   ```

## Project Structure
- `src/`: Source code
- `public/`: Static assets
- `vite.config.js`: Vite configuration
- `vercel.json`: Vercel deployment configuration

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Technologies
- React 18
- Vite
- Tailwind CSS
- Radix UI
- OpenRouter AI

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
