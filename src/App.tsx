import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { IdeasProvider } from './contexts/IdeasContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import IdeaAnalysis from './pages/IdeaAnalysis';
import IdeaDetails from './pages/IdeaDetails';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <IdeasProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/analyze" element={
                    <ProtectedRoute>
                      <IdeaAnalysis />
                    </ProtectedRoute>
                  } />
                  <Route path="/ideas/:ideaId" element={
                    <ProtectedRoute>
                      <IdeaDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/help" element={<Help />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </IdeasProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;