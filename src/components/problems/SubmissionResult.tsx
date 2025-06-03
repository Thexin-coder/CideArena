import React from 'react';
import { Submission } from '../../types/problem';
import { CheckCircle, XCircle, AlertTriangle, Clock, Database } from 'lucide-react';

interface SubmissionResultProps {
  submission: Submission;
}

const SubmissionResult: React.FC<SubmissionResultProps> = ({ submission }) => {
  const getStatusIcon = () => {
    switch (submission.status) {
      case 'Accepted':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'Wrong Answer':
        return <XCircle className="h-5 w-5 text-error-500" />;
      case 'Time Limit Exceeded':
        return <Clock className="h-5 w-5 text-warning-500" />;
      case 'Memory Limit Exceeded':
        return <Database className="h-5 w-5 text-warning-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-warning-500" />;
    }
  };

  const getStatusColor = () => {
    switch (submission.status) {
      case 'Accepted':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'Wrong Answer':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'Time Limit Exceeded':
      case 'Memory Limit Exceeded':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`p-4 rounded-md border ${getStatusColor()}`}>
      <div className="flex items-center">
        {getStatusIcon()}
        <h3 className="text-lg font-semibold ml-2">{submission.status}</h3>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Time:</p>
          <p className="font-medium">{submission.executionTime} ms</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Memory:</p>
          <p className="font-medium">{submission.memoryUsed} KB</p>
        </div>
      </div>
      
      {submission.errorMessage && (
        <div className="mt-3">
          <p className="text-sm text-gray-600">Error:</p>
          <pre className="mt-1 text-sm bg-gray-50 p-2 rounded overflow-x-auto">
            {submission.errorMessage}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SubmissionResult;