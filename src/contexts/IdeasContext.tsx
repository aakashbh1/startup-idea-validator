import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  onSnapshot,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface IdeaScore {
  marketAnalysis: number;
  problemSolving: number;
  investmentProspects: number;
  competition: number;
  scalability: number;
  revenueModel: number;
  technicalFeasibility: number;
  legalCompliance: number;
  overall: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  scores: IdeaScore;
  report: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}

interface IdeasContextType {
  ideas: Idea[];
  loading: boolean;
  addIdea: (title: string, description: string) => Promise<string>;
  updateIdea: (id: string, data: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  getIdea: (id: string) => Idea | undefined;
  analyzeIdea: (id: string) => Promise<void>;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
};

// Initialize OpenAI Client (Google Gemini via OpenRouter)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash",
});

export const IdeasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setIdeas([]);
      setLoading(false);
      return;
    }

    const ideasRef = collection(db, 'ideas');
    const q = query(ideasRef, where('userId', '==', currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ideasData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Idea[];
      
      setIdeas(ideasData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addIdea = async (title: string, description: string) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    const newIdea = {
      title,
      description,
      scores: {
        marketAnalysis: 0,
        problemSolving: 0,
        investmentProspects: 0,
        competition: 0,
        scalability: 0,
        revenueModel: 0,
        technicalFeasibility: 0,
        legalCompliance: 0,
        overall: 0
      },
      report: '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId: currentUser.uid
    };

    const docRef = await addDoc(collection(db, 'ideas'), newIdea);
    return docRef.id;
  };

  const updateIdea = async (id: string, data: Partial<Idea>) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    const ideaRef = doc(db, 'ideas', id);
    await updateDoc(ideaRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  };

  const deleteIdea = async (id: string) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    const ideaRef = doc(db, 'ideas', id);
    await deleteDoc(ideaRef);
  };

  const getIdea = (id: string) => {
    return ideas.find(idea => idea.id === id);
  };

  const analyzeIdea = async (id: string) => {
    const ideaRef = doc(db, "ideas", id);
    const ideaSnap = await getDoc(ideaRef);
  
    if (!ideaSnap.exists()) {
      throw new Error("Idea not found in Firestore");
    }
  
    const idea = ideaSnap.data() as Idea;
    
    const prompt = `Analyze the following startup idea based on various factors.  
    Idea Title: ${idea.title}  
    Description: ${idea.description}  
    Provide a structured analysis report with scores (1-10) and explanations. Format:
  
    {
      "scores": {
        "marketAnalysis": X,
        "problemSolving": X,
        "investmentProspects": X,
        "competition": X,
        "scalability": X,
        "revenueModel": X,
        "technicalFeasibility": X,
        "legalCompliance": X,
        "overall": X
      },
      "report": {
    "marketAnalysis": {
      "score": X,
      "details": {
        "demand": "...",
        "targetAudience": "...",
        "trends": "...",
        "marketSize": "...",
        "growthPotential": "..."
      }
    },
    "problemSolving": {
      "score": X,
      "details": {
        "problemIdentified": "...",
        "solutionApproach": "...",
        "userBenefit": "...",
        "uniqueness": "..."
      }
    },
    "investmentProspects": {
      "score": X,
      "details": {
        "fundingPotential": "...",
        "investorInterest": "...",
        "marketGrowth": "...",
        "riskFactors": "..."
      }
    },
    "competition": {
      "score": X,
      "details": {
        "existingPlayers": "...",
        "competitiveAdvantage": "...",
        "marketShare": "...",
        "barriersToEntry": "..."
      }
    },
    "scalability": {
      "score": X,
      "details": {
        "techScalability": "...",
        "infrastructureNeeds": "...",
        "globalPotential": "...",
        "expansionChallenges": "..."
      }
    },
    "revenueModel": {
      "score": X,
      "details": {
        "monetizationMethods": "...",
        "sustainability": "...",
        "customerWillingness": "...",
        "recurringRevenuePotential": "..."
      }
    },
    "technicalFeasibility": {
      "score": X,
      "details": {
        "developmentComplexity": "...",
        "technologyStack": "...",
        "maintenanceNeeds": "...",
        "integrationChallenges": "..."
      }
    },
    "legalCompliance": {
      "score": X,
      "details": {
        "dataPrivacy": "...",
        "regulations": "...",
        "risks": "...",
        "intellectualPropertyConcerns": "..."
      }
    },
    "overall": {
      "score": X,
      "details": {
        "summary": "...",
        "keyStrengths": "...",
        "keyWeaknesses": "...",
        "recommendations": "..."
      }
    }
  }
    }`;
  
    // console.log("Prompt:", prompt);
    try {
      const result = await model.generateContent(prompt);
  
      // Extract and parse AI response
    const aiResponse = result.response.text();
    if (!aiResponse) {
      throw new Error("Invalid AI response");
    }
    console.log("AI Response:", aiResponse);

    // Remove code block formatting if present
    const cleanedResponse = aiResponse.replace(/```json|```/g, "").trim();
    console.log("Cleaned AI Response:", cleanedResponse);
    
    let response;
    try {
      response = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      throw new Error("Failed to parse AI response.");
    }

    if (!response.scores || !response.report) {
      throw new Error("Invalid AI response structure.");
    }

    // Update Firestore with the analyzed data
    await updateIdea(id, {
      scores: response.scores,
      report: response.report,
    });

  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw new Error("Failed to analyze idea.");
  }
};


  const value = {
    ideas,
    loading,
    addIdea,
    updateIdea,
    deleteIdea,
    getIdea,
    analyzeIdea
  };

  return (
    <IdeasContext.Provider value={value}>
      {children}
    </IdeasContext.Provider>
  );
};

  // Mock AI analysis function - in a real app, this would call an API
//   const analyzeIdea = async (id: string) => {
//     // const idea = getIdea(id);
//     console.log('Analyzing idea with ID:', id);

//     // Fetch idea from Firestore
//     const ideaRef = doc(db, 'ideas', id);
//     const ideaSnap = await getDoc(ideaRef);

//     if (!ideaSnap.exists()) {
//       throw new Error('Idea not found in Firestore');
//     }

//     const idea = ideaSnap.data() as Idea;
    

//     if (!idea) throw new Error('Idea not found');

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     // Generate random scores for demo purposes
//     const getRandomScore = () => Math.floor(Math.random() * 10) + 1;
    
//     const scores = {
//       marketAnalysis: getRandomScore(),
//       problemSolving: getRandomScore(),
//       investmentProspects: getRandomScore(),
//       competition: getRandomScore(),
//       scalability: getRandomScore(),
//       revenueModel: getRandomScore(),
//       technicalFeasibility: getRandomScore(),
//       legalCompliance: getRandomScore(),
//       overall: 0
//     };
    
//     // Calculate overall score (average of all scores)
//     scores.overall = Math.round(
//       Object.values(scores).reduce((sum, score) => sum + score, 0) / 
//       (Object.keys(scores).length - 1) // -1 to exclude the overall score itself
//     );

//     // Generate a mock report
//     const report = `
// # Startup Idea Analysis Report

// ## Executive Summary
// Your idea "${idea.title}" has been analyzed across multiple dimensions. The overall score is ${scores.overall}/10.

// ## Detailed Analysis

// ### Market Analysis: ${scores.marketAnalysis}/10
// ${scores.marketAnalysis > 7 ? 'The market potential for this idea is excellent.' : 
//   scores.marketAnalysis > 4 ? 'There is moderate market potential for this idea.' : 
//   'The market potential for this idea is limited.'}

// ### Problem-Solving Potential: ${scores.problemSolving}/10
// ${scores.problemSolving > 7 ? 'This idea solves a significant problem for users.' : 
//   scores.problemSolving > 4 ? 'This idea addresses a moderate problem for users.' : 
//   'This idea may not solve a compelling problem for users.'}

// ### Investment Prospects: ${scores.investmentProspects}/10
// ${scores.investmentProspects > 7 ? 'This idea is likely to attract investor interest.' : 
//   scores.investmentProspects > 4 ? 'This idea may attract some investor interest with refinement.' : 
//   'This idea may struggle to attract investor interest in its current form.'}

// ### Competition: ${scores.competition}/10
// ${scores.competition > 7 ? 'This idea has limited competition in the market.' : 
//   scores.competition > 4 ? 'This idea faces moderate competition in the market.' : 
//   'This idea faces significant competition in the market.'}

// ### Scalability: ${scores.scalability}/10
// ${scores.scalability > 7 ? 'This idea has excellent scalability potential.' : 
//   scores.scalability > 4 ? 'This idea has moderate scalability potential.' : 
//   'This idea may face scalability challenges.'}

// ### Revenue Model: ${scores.revenueModel}/10
// ${scores.revenueModel > 7 ? 'The revenue model for this idea is strong and sustainable.' : 
//   scores.revenueModel > 4 ? 'The revenue model for this idea has potential but may need refinement.' : 
//   'The revenue model for this idea needs significant development.'}

// ### Technical Feasibility: ${scores.technicalFeasibility}/10
// ${scores.technicalFeasibility > 7 ? 'This idea is technically feasible with current technology.' : 
//   scores.technicalFeasibility > 4 ? 'This idea presents moderate technical challenges.' : 
//   'This idea presents significant technical challenges.'}

// ### Legal & Compliance Risks: ${scores.legalCompliance}/10
// ${scores.legalCompliance > 7 ? 'This idea has minimal legal and compliance risks.' : 
//   scores.legalCompliance > 4 ? 'This idea has moderate legal and compliance considerations.' : 
//   'This idea has significant legal and compliance considerations that need addressing.'}

// ## Recommendations
// ${scores.overall > 7 ? 'This idea shows strong potential. Consider moving forward with development and seeking investment.' : 
//   scores.overall > 5 ? 'This idea shows promise but needs refinement in key areas before proceeding.' : 
//   'This idea needs significant development before it can be considered viable.'}

// ## Next Steps
// 1. Refine your business model
// 2. Conduct market research
// 3. Develop a minimum viable product (MVP)
// 4. Seek feedback from potential users
// 5. Iterate based on feedback
//     `;

//     await updateIdea(id, { scores, report });
//   };

  