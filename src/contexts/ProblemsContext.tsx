import React, { createContext, useContext, useState, useEffect } from 'react';
import { Problem, Submission, ProblemDifficulty } from '../types/problem';
import { problemsData } from '../data/problems';
import { useAuth } from './AuthContext';

interface ProblemsContextType {
  problems: Problem[];
  submissions: Record<string, Submission[]>;
  getProblem: (id: string) => Problem | undefined;
  submitSolution: (problemId: string, code: string, language: string) => Promise<Submission>;
  addProblem: (problem: Omit<Problem, 'id'>) => Promise<Problem>;
  updateProblem: (id: string, problem: Partial<Problem>) => Promise<Problem>;
  deleteProblem: (id: string) => Promise<void>;
}

const ProblemsContext = createContext<ProblemsContextType | undefined>(undefined);

export const ProblemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, Submission[]>>({});
  const { user } = useAuth();

  useEffect(() => {
    // Load problems
    setProblems(problemsData);
    
    // Load submissions from localStorage if available
    const storedSubmissions = localStorage.getItem('submissions');
    if (storedSubmissions) {
      try {
        setSubmissions(JSON.parse(storedSubmissions));
      } catch (error) {
        console.error('Failed to parse stored submissions:', error);
      }
    }
  }, []);

  // Save submissions to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(submissions).length > 0) {
      localStorage.setItem('submissions', JSON.stringify(submissions));
    }
  }, [submissions]);

  const getProblem = (id: string) => {
    return problems.find(problem => problem.id === id);
  };

  const submitSolution = async (problemId: string, code: string, language: string): Promise<Submission> => {
    if (!user) {
      throw new Error('You must be logged in to submit a solution');
    }

    const problem = getProblem(problemId);
    if (!problem) {
      throw new Error('Problem not found');
    }

    // In a real app, this would send the code to a judge system
    // For demo purposes, we'll do a simple "check" based on expected output
    const isCorrect = code.includes(problem.expectedOutput);
    
    const submission: Submission = {
      id: Date.now().toString(),
      problemId,
      userId: user.id,
      username: user.username,
      language,
      code,
      status: isCorrect ? 'Accepted' : 'Wrong Answer',
      executionTime: Math.floor(Math.random() * 500) + 50, // Random time between 50-550ms
      memoryUsed: Math.floor(Math.random() * 10000) + 1000, // Random memory between 1000-11000KB
      submittedAt: new Date().toISOString(),
    };

    // Update submissions state
    setSubmissions(prev => {
      const problemSubmissions = prev[problemId] || [];
      return {
        ...prev,
        [problemId]: [...problemSubmissions, submission]
      };
    });

    return submission;
  };

  const addProblem = async (problem: Omit<Problem, 'id'>): Promise<Problem> => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      throw new Error('You do not have permission to add problems');
    }

    const newProblem: Problem = {
      id: (problems.length + 1).toString(),
      ...problem,
      createdBy: user.username,
      createdAt: new Date().toISOString(),
    };

    setProblems(prev => [...prev, newProblem]);
    return newProblem;
  };

  const updateProblem = async (id: string, problemUpdate: Partial<Problem>): Promise<Problem> => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      throw new Error('You do not have permission to update problems');
    }

    const problemIndex = problems.findIndex(p => p.id === id);
    if (problemIndex === -1) {
      throw new Error('Problem not found');
    }

    const updatedProblem = {
      ...problems[problemIndex],
      ...problemUpdate,
      updatedAt: new Date().toISOString(),
    };

    const updatedProblems = [...problems];
    updatedProblems[problemIndex] = updatedProblem;
    
    setProblems(updatedProblems);
    return updatedProblem;
  };

  const deleteProblem = async (id: string): Promise<void> => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      throw new Error('You do not have permission to delete problems');
    }

    setProblems(prev => prev.filter(problem => problem.id !== id));
  };

  return (
    <ProblemsContext.Provider value={{
      problems,
      submissions,
      getProblem,
      submitSolution,
      addProblem,
      updateProblem,
      deleteProblem
    }}>
      {children}
    </ProblemsContext.Provider>
  );
};

export const useProblems = (): ProblemsContextType => {
  const context = useContext(ProblemsContext);
  if (context === undefined) {
    throw new Error('useProblems must be used within a ProblemsProvider');
  }
  return context;
};