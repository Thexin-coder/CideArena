import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProblems } from '../../contexts/ProblemsContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Problem, ProblemDifficulty, ProblemCategory } from '../../types/problem';

const ProblemManager: React.FC = () => {
  const { problems, deleteProblem } = useProblems();
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(problems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<ProblemDifficulty[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProblemCategory[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle search and filter
  React.useEffect(() => {
    let result = problems;
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(problem =>
        problem.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        problem.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    // Apply difficulty filter
    if (selectedDifficulties.length > 0) {
      result = result.filter(problem => 
        selectedDifficulties.includes(problem.difficulty)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(problem => 
        problem.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    setFilteredProblems(result);
  }, [problems, searchTerm, selectedDifficulties, selectedCategories]);

  const toggleDifficulty = (difficulty: ProblemDifficulty) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };

  const toggleCategory = (category: ProblemCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulties([]);
    setSelectedCategories([]);
  };

  const handleDeleteClick = (problem: Problem) => {
    setProblemToDelete(problem);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!problemToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteProblem(problemToDelete.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete problem:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Get all unique categories
  const allCategories = Array.from(
    new Set(problems.flatMap(problem => problem.categories))
  ) as ProblemCategory[];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Problem Management</h1>
          <p className="text-gray-600">
            Manage, edit, and add problems to the platform.
          </p>
        </div>
        <Link 
          to="/admin/problems/new" 
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>New Problem</span>
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="form-input pl-10 pr-4 py-2 w-full"
                placeholder="Search problems by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Button */}
            <div>
              <button 
                className="btn-outline flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-2" />
                <span>Filter</span>
                {(selectedDifficulties.length > 0 || selectedCategories.length > 0) && (
                  <span className="ml-1 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {selectedDifficulties.length + selectedCategories.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {(['easy', 'medium', 'hard', 'expert'] as ProblemDifficulty[]).map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => toggleDifficulty(difficulty)}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          selectedDifficulties.includes(difficulty)
                            ? difficulty === 'easy' 
                              ? 'bg-success-600 text-white' 
                              : difficulty === 'medium'
                              ? 'bg-warning-600 text-white'
                              : difficulty === 'hard'
                              ? 'bg-error-600 text-white'
                              : 'bg-primary-800 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {selectedDifficulties.includes(difficulty) && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          selectedCategories.includes(category)
                            ? 'bg-secondary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {selectedCategories.includes(category) && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {(selectedDifficulties.length > 0 || selectedCategories.length > 0 || searchTerm) && (
                <div className="mt-4 flex justify-end">
                  <button 
                    className="text-sm text-gray-600 hover:text-gray-900"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Problem List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {problem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {problem.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        problem.difficulty === 'easy' ? 'bg-success-100 text-success-800' :
                        problem.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' :
                        problem.difficulty === 'hard' ? 'bg-error-100 text-error-800' :
                        'bg-primary-100 text-primary-800'
                      }`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {problem.categories.slice(0, 2).map((category, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                          >
                            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        ))}
                        {problem.categories.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                            +{problem.categories.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problem.createdBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link 
                          to={`/admin/problems/${problem.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button 
                          className="text-error-600 hover:text-error-900"
                          onClick={() => handleDeleteClick(problem)}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No problems found matching your criteria.
                    {(selectedDifficulties.length > 0 || selectedCategories.length > 0 || searchTerm) && (
                      <div className="mt-2">
                        <button 
                          className="text-primary-600 hover:text-primary-900"
                          onClick={clearFilters}
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && problemToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
            <div className="flex items-center text-error-600 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            </div>
            <p className="mb-4">
              Are you sure you want to delete the problem "{problemToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="btn-outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="btn-error flex items-center"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemManager;