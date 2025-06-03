import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProblems } from '../contexts/ProblemsContext';
import { useAuth } from '../contexts/AuthContext';
import CodeEditor from '../components/problems/CodeEditor';
import ProblemDescription from '../components/problems/ProblemDescription';
import SubmissionResult from '../components/problems/SubmissionResult';
import { Submission } from '../types/problem';
import { 
  ChevronLeft, 
  FileText, 
  Play, 
  Send,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProblem, submissions, submitSolution } = useProblems();
  const { isAuthenticated, user } = useAuth();
  const problem = getProblem(id || '');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<Submission | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState<'description' | 'editor'>('description');
  
  const problemSubmissions = submissions[id || ''] || [];
  
  useEffect(() => {
    if (!problem) {
      navigate('/problems');
    } else {
      // Set default starter code based on selected language
      setDefaultCode(language);
    }
  }, [problem, navigate, language]);

  const setDefaultCode = (lang: string) => {
    if (!problem) return;
    
    let defaultCode = '';
    
    if (lang === 'cpp') {
      defaultCode = `#include <iostream>
#include <vector>
using namespace std;

// Problem: ${problem.title}
// ${problem.difficulty} difficulty

// Your solution here
// Remember to follow the input/output format described in the problem

int main() {
    // Your code here
    
    return 0;
}`;
    } else if (lang === 'python') {
      defaultCode = `# Problem: ${problem.title}
# ${problem.difficulty} difficulty

# Your solution here
# Remember to follow the input/output format described in the problem

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`;
    } else if (lang === 'javascript') {
      defaultCode = `// Problem: ${problem.title}
// ${problem.difficulty} difficulty

// Your solution here
// Remember to follow the input/output format described in the problem

function main() {
  // Your code here
}

main();`;
    }
    
    setCode(defaultCode);
  };

  const handleRunCode = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to run code');
      return;
    }
    
    toast.success('Code execution feature coming soon!');
  };

  const handleSubmitSolution = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to submit solutions');
      return;
    }
    
    if (!problem || !id) return;
    
    if (code.trim() === '') {
      toast.error('Please write some code before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitSolution(id, code, language);
      setLatestSubmission(result);
      setShowResult(true);
      
      if (result.status === 'Accepted') {
        toast.success('Submission accepted!');
      } else {
        toast.error(`Submission failed: ${result.status}`);
      }
    } catch (error) {
      toast.error('Failed to submit solution');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const isSolved = user?.solvedProblems.includes(id || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Problem Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/problems')}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                {problem.id}. {problem.title}
              </h1>
              {isSolved && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  Solved
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                problem.difficulty === 'easy' ? 'bg-success-100 text-success-800' :
                problem.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' :
                problem.difficulty === 'hard' ? 'bg-error-100 text-error-800' :
                'bg-primary-100 text-primary-800'
              }`}>
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden bg-white border-b">
        <div className="flex">
          <button 
            className={`flex-1 py-3 text-center text-sm font-medium ${
              mode === 'description' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'
            }`}
            onClick={() => setMode('description')}
          >
            <FileText className="h-4 w-4 mx-auto mb-1" />
            Description
          </button>
          <button 
            className={`flex-1 py-3 text-center text-sm font-medium ${
              mode === 'editor' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'
            }`}
            onClick={() => setMode('editor')}
          >
            <Play className="h-4 w-4 mx-auto mb-1" />
            Code
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Problem Description (hidden on mobile when editor is active) */}
          <div 
            className={`${
              mode === 'editor' ? 'hidden md:block' : ''
            } md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden`}
          >
            <ProblemDescription problem={problem} />
          </div>

          {/* Code Editor (hidden on mobile when description is active) */}
          <div 
            className={`${
              mode === 'description' ? 'hidden md:block' : ''
            } md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden`}
          >
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center">
                  <select
                    className="form-input py-1 px-2 text-sm"
                    value={language}
                    onChange={(e) => {
                      const newLang = e.target.value;
                      setLanguage(newLang);
                      setDefaultCode(newLang);
                    }}
                  >
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="btn-outline py-1 px-3 text-sm flex items-center"
                    onClick={handleRunCode}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </button>
                  <button 
                    className="btn-primary py-1 px-3 text-sm flex items-center"
                    onClick={handleSubmitSolution}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              language={language} 
            />
            
            {/* Show submission result if available */}
            {showResult && latestSubmission && (
              <div className="p-4 border-t border-gray-200">
                <SubmissionResult submission={latestSubmission} />
                <button
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setShowResult(false)}
                >
                  Hide result
                </button>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="p-4 bg-warning-50 border-t border-warning-200 flex items-center">
                <AlertTriangle className="h-5 w-5 text-warning-500 mr-2" />
                <p className="text-sm text-warning-700">
                  Please <a href="/login" className="font-medium underline">log in</a> to submit your solution.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Previous Submissions */}
        {isAuthenticated && problemSubmissions.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary-600 text-white px-6 py-3">
              <h2 className="text-lg font-semibold">Previous Submissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Runtime
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Memory
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {problemSubmissions
                    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                    .map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          submission.status === 'Accepted' ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.language === 'cpp' ? 'C++' : 
                         submission.language === 'python' ? 'Python' : 'JavaScript'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.executionTime ? `${submission.executionTime} ms` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.memoryUsed ? `${submission.memoryUsed} KB` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetailPage;