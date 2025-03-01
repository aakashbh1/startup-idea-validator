import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';
import { PlusCircle, Trash2, FileText, BarChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { ideas, loading, deleteIdea } = useIdeas();
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        await deleteIdea(id);
      } catch (error) {
        console.error('Failed to delete idea', error);
      }
    }
  };

  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? a.createdAt.seconds - b.createdAt.seconds
        : b.createdAt.seconds - a.createdAt.seconds;
    } else {
      return sortOrder === 'asc'
        ? a.scores.overall - b.scores.overall
        : b.scores.overall - a.scores.overall;
    }
  });

  const toggleSort = (type: 'date' | 'score') => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Ideas</h1>
        <Link
          to="/analyze"
          className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Idea
        </Link>
      </div>

      {ideas.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No ideas yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start by creating your first idea for analysis
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Your First Idea
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <button
                onClick={() => toggleSort('date')}
                className={`flex items-center text-sm ${
                  sortBy === 'date' 
                    ? 'text-teal-500 dark:text-teal-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Date
                {sortBy === 'date' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
              <button
                onClick={() => toggleSort('score')}
                className={`flex items-center text-sm ${
                  sortBy === 'score' 
                    ? 'text-teal-500 dark:text-teal-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Score
                {sortBy === 'score' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedIdeas.map((idea) => (
              <Link
                key={idea.id}
                to={`/ideas/${idea.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
                      {idea.title}
                    </h2>
                    <button
                      onClick={(e) => handleDelete(idea.id, e)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {idea.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-1" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {idea.scores.overall > 0 ? `${idea.scores.overall}/10` : 'Not analyzed'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(idea.createdAt.seconds * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {idea.scores.overall > 0 && (
                  <div className="h-2 bg-gray-200 dark:bg-gray-700">
                    <div 
                      className={`h-full ${
                        idea.scores.overall >= 8 ? 'bg-green-500' :
                        idea.scores.overall >= 6 ? 'bg-teal-500' :
                        idea.scores.overall >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${idea.scores.overall * 10}%` }}
                    ></div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;