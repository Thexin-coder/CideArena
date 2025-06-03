import React from 'react';
import { Problem } from '../../types/problem';

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{problem.title}</h2>
        
        <div className="mb-6">
          <div className="prose max-w-none">
            <p>{problem.description}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Constraints</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="whitespace-pre-line">{problem.constraints}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Input Format</h3>
          <p className="mb-2">{problem.inputFormat}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Output Format</h3>
          <p className="mb-2">{problem.outputFormat}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Example</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Input</h4>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <code>{problem.sampleInput}</code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">Output</h4>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                <code>{problem.sampleOutput}</code>
              </pre>
            </div>
          </div>
        </div>
        
        {problem.explanation && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Explanation</h3>
            <p className="whitespace-pre-line">{problem.explanation}</p>
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Time and Memory Limits</h3>
          <div className="flex space-x-4">
            <div className="bg-gray-50 px-4 py-2 rounded-md">
              <span className="text-gray-500 text-sm">Time:</span>
              <span className="ml-2 font-medium">{problem.timeLimit} ms</span>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">
              <span className="text-gray-500 text-sm">Memory:</span>
              <span className="ml-2 font-medium">{problem.memoryLimit} KB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;