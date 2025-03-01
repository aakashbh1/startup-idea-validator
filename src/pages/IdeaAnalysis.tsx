import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdeas } from '../contexts/IdeasContext';
import { Lightbulb, ArrowRight } from 'lucide-react';

const IdeaAnalysis: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { addIdea, analyzeIdea } = useIdeas();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a title for your idea');
      return;
    }
    
    if (!description.trim()) {
      setError('Please enter a description for your idea');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Add the idea to the database
      const ideaId = await addIdea(title, description);
      console.log('Idea ID received:', ideaId); // Debug log
      if (!ideaId) {
        throw new Error('Failed to create idea. No ID returned.');
      }
      await analyzeIdea(ideaId);
      
      // Analyze the idea
      await analyzeIdea(ideaId);
      
      // Navigate to the idea details page
      navigate(`/ideas/${ideaId}`);
    } catch (error) {
      console.error('Error submitting idea:', error);
      setError('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-8 w-8 text-teal-500 dark:text-teal-400" />
          <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
            New Idea Analysis
          </h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Idea Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., AI-Powered Fitness Coach"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Idea Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your idea in detail. What problem does it solve? Who is it for? How will it work?"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Idea
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-500 dark:text-teal-400">
              1
            </div>
            <div className="ml-4">
              <p className="text-gray-700 dark:text-gray-300">
                Enter your startup or business idea with a clear title and detailed description
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-500 dark:text-teal-400">
              2
            </div>
            <div className="ml-4">
              <p className="text-gray-700 dark:text-gray-300">
                Our AI analyzes your idea across multiple dimensions including market potential, scalability, and more
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-500 dark:text-teal-400">
              3
            </div>
            <div className="ml-4">
              <p className="text-gray-700 dark:text-gray-300">
                Receive a comprehensive report with scores and actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaAnalysis;