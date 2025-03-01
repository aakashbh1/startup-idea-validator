import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight, Lightbulb, BarChart, FileText, Download } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-8 w-8 text-teal-500 dark:text-teal-400" />
          <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
            Help & Documentation
          </h1>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Getting Started
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              IdeaEvaluator helps you analyze and evaluate your startup or business ideas using AI. 
              Get comprehensive reports and scores to understand the strengths and weaknesses of your ideas.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Quick Start Guide
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <span className="font-medium">Create an account</span> or sign in with your existing credentials
                </li>
                <li>
                  Click on <span className="font-medium">New Idea</span> to start a new analysis
                </li>
                <li>
                  Enter your idea's title and a detailed description
                </li>
                <li>
                  Wait for the AI to analyze your idea (usually takes a few seconds)
                </li>
                <li>
                  Review your detailed report and scores
                </li>
              </ol>
              <div className="mt-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Start your first analysis
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Idea Analysis
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Submit your business ideas for comprehensive AI analysis across multiple dimensions including market potential, scalability, and more.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <BarChart className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Scoring System
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive detailed scores for each aspect of your idea, helping you identify strengths and areas for improvement.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Detailed Reports
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Get comprehensive reports with actionable insights and recommendations to improve your business idea.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Download className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Export & Download
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Export your analysis reports as PDF documents to share with team members, investors, or mentors.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                  How accurate is the AI analysis?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI provides insights based on patterns from thousands of startups and business cases. While it offers valuable guidance, it's best used as one input among many for your decision-making process.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                  Is my data secure?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, we take data security seriously. Your ideas and analyses are stored securely and are only accessible to you. We never share your data with third parties.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                  Can I update my idea after analysis?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Currently, you need to create a new analysis for updated versions of your idea. This allows you to track how your idea evolves over time.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                  How many ideas can I analyze?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  In the current version, you can analyze an unlimited number of ideas at no cost.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Need More Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions or need assistance, please contact our support team at support@ideaevaluator.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;