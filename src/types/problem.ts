export type ProblemDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type ProblemCategory = 
  | 'arrays' 
  | 'strings' 
  | 'sorting' 
  | 'searching' 
  | 'dynamic-programming' 
  | 'greedy' 
  | 'graphs' 
  | 'trees' 
  | 'math'
  | 'implementation';

export interface TestCase {
  input: string;
  output: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  categories: ProblemCategory[];
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  explanation?: string;
  testCases: TestCase[];
  timeLimit: number; // in milliseconds
  memoryLimit: number; // in KB
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  expectedOutput: string; // Simplified for demo - in a real app, would be handled by the judge system
}

export type SubmissionStatus = 
  | 'Accepted' 
  | 'Wrong Answer' 
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error'
  | 'Pending';

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  username: string;
  language: string;
  code: string;
  status: SubmissionStatus;
  executionTime?: number; // in milliseconds
  memoryUsed?: number; // in KB
  submittedAt: string;
  errorMessage?: string;
}