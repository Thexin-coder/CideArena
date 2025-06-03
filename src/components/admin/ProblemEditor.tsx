import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProblems } from '../../contexts/ProblemsContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Save, 
  Plus, 
  Trash, 
  ArrowLeft,
  CheckCircle,
  Info,
  X,
  AlertTriangle
} from 'lucide-react';
import { ProblemDifficulty, ProblemCategory, TestCase } from '../../types/problem';

const ProblemEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProblem, addProblem, updateProblem } = useProblems();
  const { user } = useAuth();
  const isNewProblem = !id;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<ProblemDifficulty>('medium');
  const [categories, setCategories] = useState<ProblemCategory[]>([]);
  const [constraints, setConstraints] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [timeLimit, setTimeLimit] = useState(1000); // in ms
  const [memoryLimit, setMemoryLimit] = useState(256000); // in KB
  const [expectedOutput, setExpectedOutput] = useState('');
  const [newCategory, setNewCategory] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load problem data if editing
  useEffect(() => {
    if (!isNewProblem && id) {
      const problem = getProblem(id);
      if (problem) {
        setTitle(problem.title);
        setDescription(problem.description);
        setDifficulty(problem.difficulty);
        setCategories(problem.categories);
        setConstraints(problem.constraints);
        setInputFormat(problem.inputFormat);
        setOutputFormat(problem.outputFormat);
        setSampleInput(problem.sampleInput);
        setSampleOutput(problem.sampleOutput);
        setExplanation(problem.explanation || '');
        setTestCases(problem.testCases);
        setTimeLimit(problem.timeLimit);
        setMemoryLimit(problem.memoryLimit);
        setExpectedOutput(problem.expectedOutput);
      }
    }
  }, [isNewProblem, id, getProblem]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!constraints.trim()) newErrors.constraints = 'Constraints are required';
    if (!inputFormat.trim()) newErrors.inputFormat = 'Input format is required';
    if (!outputFormat.trim()) newErrors.outputFormat = 'Output format is required';
    if (!sampleInput.trim()) newErrors.sampleInput = 'Sample input is required';
    if (!sampleOutput.trim()) newErrors.sampleOutput = 'Sample output is required';
    if (categories.length === 0) newErrors.categories = 'At least one category is required';
    if (testCases.length === 0) newErrors.testCases = 'At least one test case is required';
    if (!expectedOutput.trim()) newErrors.expectedOutput = 'Expected output is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    // Convert to kebab-case
    const formattedCategory = newCategory
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') as ProblemCategory;
    
    if (!categories.includes(formattedCategory)) {
      setCategories([...categories, formattedCategory]);
    }
    
    setNewCategory('');
  };

  const handleRemoveCategory = (categoryToRemove: ProblemCategory) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { 
      input: '', 
      output: '',
      isHidden: false
    }]);
  };

  const handleUpdateTestCase = (index: number, field: keyof TestCase, value: string | boolean) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index] = { 
      ...updatedTestCases[index], 
      [field]: value 
    };
    setTestCases(updatedTestCases);
  };

  const handleRemoveTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      const problemData = {
        title,
        description,
        difficulty,
        categories,
        constraints,
        inputFormat,
        outputFormat,
        sampleInput,
        sampleOutput,
        explanation: explanation || undefined,
        testCases,
        timeLimit,
        memoryLimit,
        createdBy: user?.username || 'admin',
        expectedOutput,
      };
      
      if (isNewProblem) {
        await addProblem(problemData);
        setSuccessMessage('Problem created successfully!');
        // Clear form for new problem
        setTitle('');
        setDescription('');
        setDifficulty('medium');
        setCategories([]);
        setConstraints('');
        setInputFormat('');
        setOutputFormat('');
        setSampleInput('');
        setSampleOutput('');
        setExplanation('');
        setTestCases([]);
        setTimeLimit(1000);
        setMemoryLimit(256000);
        setExpectedOutput('');
      } else if (id) {
        await updateProblem(id, problemData);
        setSuccessMessage('Problem updated successfully!');
      }
    } catch (error) {
      console.error('Failed to save problem:', error);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/problems')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNewProblem ? 'Create New Problem' : `Edit Problem: ${title}`}
          </h1>
          <p className="text-gray-600">
            {isNewProblem 
              ? 'Create a new coding challenge for users to solve' 
              : 'Update the details of this coding challenge'}
          </p>
        </div>
      </div>
      
      {successMessage && (
        <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded relative flex items-center" role="alert">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{successMessage}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSuccessMessage('')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Details</h2>
          
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-error-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                className={`form-input w-full ${errors.title ? 'border-error-500' : ''}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-error-600">{errors.title}</p>
              )}
            </div>
            
            {/* Difficulty & Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty <span className="text-error-600">*</span>
                </label>
                <select
                  id="difficulty"
                  className="form-input w-full"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as ProblemDifficulty)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories <span className="text-error-600">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories.map((category) => (
                    <div 
                      key={category}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1"
                    >
                      <span>{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      <button 
                        type="button" 
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveCategory(category)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className={`form-input flex-grow ${errors.categories ? 'border-error-500' : ''}`}
                    placeholder="Add a category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCategory();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 btn-outline py-2"
                    onClick={handleAddCategory}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {errors.categories && (
                  <p className="mt-1 text-sm text-error-600">{errors.categories}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Some example categories: arrays, strings, sorting, searching, dynamic-programming, graphs, trees, math
                </p>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-error-600">*</span>
              </label>
              <textarea
                id="description"
                rows={6}
                className={`form-input w-full ${errors.description ? 'border-error-500' : ''}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-error-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Provide a clear and detailed description of the problem.
              </p>
            </div>
            
            {/* Constraints */}
            <div>
              <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-1">
                Constraints <span className="text-error-600">*</span>
              </label>
              <textarea
                id="constraints"
                rows={3}
                className={`form-input w-full ${errors.constraints ? 'border-error-500' : ''}`}
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
              />
              {errors.constraints && (
                <p className="mt-1 text-sm text-error-600">{errors.constraints}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Specify constraints like input size limits, value ranges, etc.
              </p>
            </div>
            
            {/* Input/Output Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-700 mb-1">
                  Input Format <span className="text-error-600">*</span>
                </label>
                <textarea
                  id="inputFormat"
                  rows={3}
                  className={`form-input w-full ${errors.inputFormat ? 'border-error-500' : ''}`}
                  value={inputFormat}
                  onChange={(e) => setInputFormat(e.target.value)}
                />
                {errors.inputFormat && (
                  <p className="mt-1 text-sm text-error-600">{errors.inputFormat}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700 mb-1">
                  Output Format <span className="text-error-600">*</span>
                </label>
                <textarea
                  id="outputFormat"
                  rows={3}
                  className={`form-input w-full ${errors.outputFormat ? 'border-error-500' : ''}`}
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                />
                {errors.outputFormat && (
                  <p className="mt-1 text-sm text-error-600">{errors.outputFormat}</p>
                )}
              </div>
            </div>
            
            {/* Sample Input/Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sampleInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Input <span className="text-error-600">*</span>
                </label>
                <textarea
                  id="sampleInput"
                  rows={4}
                  className={`form-input w-full font-mono text-sm ${errors.sampleInput ? 'border-error-500' : ''}`}
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                />
                {errors.sampleInput && (
                  <p className="mt-1 text-sm text-error-600">{errors.sampleInput}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="sampleOutput" className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Output <span className="text-error-600">*</span>
                </label>
                <textarea
                  id="sampleOutput"
                  rows={4}
                  className={`form-input w-full font-mono text-sm ${errors.sampleOutput ? 'border-error-500' : ''}`}
                  value={sampleOutput}
                  onChange={(e) => setSampleOutput(e.target.value)}
                />
                {errors.sampleOutput && (
                  <p className="mt-1 text-sm text-error-600">{errors.sampleOutput}</p>
                )}
              </div>
            </div>
            
            {/* Explanation */}
            <div>
              <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                Explanation (Optional)
              </label>
              <textarea
                id="explanation"
                rows={4}
                className="form-input w-full"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide an explanation for the sample input/output.
              </p>
            </div>
          </div>
        </div>
        
        {/* Test Cases */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Test Cases</h2>
            <button
              type="button"
              className="btn-outline py-1 px-3 text-sm flex items-center"
              onClick={handleAddTestCase}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Test Case
            </button>
          </div>
          
          {errors.testCases && (
            <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>{errors.testCases}</span>
            </div>
          )}
          
          {testCases.length > 0 ? (
            <div className="space-y-6">
              {testCases.map((testCase, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Test Case #{index + 1}</h3>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600"
                          checked={testCase.isHidden}
                          onChange={(e) => handleUpdateTestCase(index, 'isHidden', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Hidden</span>
                      </label>
                      <button
                        type="button"
                        className="text-error-600 hover:text-error-800"
                        onClick={() => handleRemoveTestCase(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Input
                      </label>
                      <textarea
                        rows={3}
                        className="form-input w-full font-mono text-sm"
                        value={testCase.input}
                        onChange={(e) => handleUpdateTestCase(index, 'input', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Output
                      </label>
                      <textarea
                        rows={3}
                        className="form-input w-full font-mono text-sm"
                        value={testCase.output}
                        onChange={(e) => handleUpdateTestCase(index, 'output', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">No test cases added yet. Click the button above to add one.</p>
            </div>
          )}
        </div>
        
        {/* Additional Settings */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit (ms)
                </label>
                <input
                  id="timeLimit"
                  type="number"
                  min="100"
                  step="100"
                  className="form-input w-full"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <label htmlFor="memoryLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  Memory Limit (KB)
                </label>
                <input
                  id="memoryLimit"
                  type="number"
                  min="1000"
                  step="1000"
                  className="form-input w-full"
                  value={memoryLimit}
                  onChange={(e) => setMemoryLimit(parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="expectedOutput" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Output Pattern <span className="text-error-600">*</span>
              </label>
              <input
                id="expectedOutput"
                type="text"
                className={`form-input w-full ${errors.expectedOutput ? 'border-error-500' : ''}`}
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
              />
              {errors.expectedOutput && (
                <p className="mt-1 text-sm text-error-600">{errors.expectedOutput}</p>
              )}
              <div className="mt-2 flex items-start">
                <Info className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">
                  For demo purposes, this is a pattern that will be used to check if a user's solution is correct.
                  In a real judge system, the code would be executed against test cases.
                  Enter a string that should appear in the correct solution (e.g. for a "Two Sum" problem, you might enter "return [").
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            type="button"
            className="btn-outline mr-3"
            onClick={() => navigate('/admin/problems')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {isNewProblem ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isNewProblem ? 'Create Problem' : 'Update Problem'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemEditor;