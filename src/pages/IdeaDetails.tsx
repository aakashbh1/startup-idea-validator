import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIdeas, IdeaScore } from '../contexts/IdeasContext';
import { ArrowLeft, Download, RefreshCw, Trash2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from '../components/reports/ReportPDF';

const IdeaDetails: React.FC = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const { getIdea, analyzeIdea, deleteIdea } = useIdeas();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  
  if (!ideaId) {
    navigate('/dashboard');
    return null;
  }
  
  const idea = getIdea(ideaId);
  // console.log('Idea:', idea); // Debug log
  
  if (!idea) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Idea not found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The idea you're looking for doesn't exist or has been deleted.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  const handleReanalyze = async () => {
    try {
      setIsAnalyzing(true);
      await analyzeIdea(ideaId);
    } catch (error) {
      console.error('Error reanalyzing idea:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        await deleteIdea(ideaId);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to delete idea', error);
      }
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-teal-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const scoreCategories = [
    { key: 'marketAnalysis', label: 'Market Analysis' },
    { key: 'problemSolving', label: 'Problem-Solving' },
    { key: 'investmentProspects', label: 'Investment Prospects' },
    { key: 'competition', label: 'Competition' },
    { key: 'scalability', label: 'Scalability' },
    { key: 'revenueModel', label: 'Revenue Model' },
    { key: 'technicalFeasibility', label: 'Technical Feasibility' },
    { key: 'legalCompliance', label: 'Legal & Compliance' },
    {key:'overall',label:'Overall'}
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </button>
        
        <div className="flex space-x-2">
          {idea.report && (
            <PDFDownloadLink
              document={<ReportPDF idea={idea} />}
              fileName={`${idea.title.replace(/\s+/g, '-').toLowerCase()}-analysis.pdf`}
              className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {({ loading }) => (
                <>
                  {loading ? 'Preparing...' : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      Export PDF
                    </>
                  )}
                </>
              )}
            </PDFDownloadLink>
          )}
          
          <button
            onClick={handleReanalyze}
            disabled={isAnalyzing}
            className="inline-flex items-center px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-md hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-teal-700 dark:border-teal-300 mr-1"></div>
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1" />
                Reanalyze
              </>
            )}
          </button>
          
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {idea.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 whitespace-pre-line">
            {idea.description}
          </p>
          
          {idea.scores.overall > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Overall Score
                  </h2>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {idea.scores.overall}/10
                  </span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreColor(idea.scores.overall)}`}
                    style={{ width: `${idea.scores.overall * 10}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {scoreCategories.map(category => {
                  const score = idea.scores[category.key as keyof IdeaScore];
                  return (
                    <div key={category.key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category.label}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {score}/10
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getScoreColor(score)}`}
                          style={{ width: `${score * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Analysis Report
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                {Object.entries(idea.report).map(([key, section]) => (
                  <div key={key} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {scoreCategories.find(cat => cat.key === key)?.label || key}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">Score: {section.score}/10</p>
                    <ul className="text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                      {Object.entries(section.details).map(([detailKey, detailValue]) => (
                        <li key={detailKey}>
                          <span className="font-medium capitalize">{detailKey.replace(/([A-Z])/g, ' $1')}:</span> {detailValue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                {isAnalyzing ? 'Analyzing your idea...' : 'Analysis pending...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;