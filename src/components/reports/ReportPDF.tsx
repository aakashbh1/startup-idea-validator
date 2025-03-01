import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Idea } from '../../contexts/IdeasContext';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #EEEEEE',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  scoreLabel: {
    fontSize: 12,
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreBar: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    marginBottom: 10,
  },
  scoreBarFill: {
    height: 8,
    borderRadius: 4,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  footer: {
    marginTop: 30,
    borderTop: '1 solid #EEEEEE',
    paddingTop: 10,
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },
});

// Helper function to get score color
const getScoreColor = (score: number) => {
  if (score >= 8) return '#10B981'; // green-500
  if (score >= 6) return '#14B8A6'; // teal-500
  if (score >= 4) return '#FBBF24'; // yellow-500
  return '#EF4444'; // red-500
};

interface ReportPDFProps {
  idea: Idea;
}

const ReportPDF: React.FC<ReportPDFProps> = ({ idea }) => {
  const scoreCategories = [
    { key: 'marketAnalysis', label: 'Market Analysis' },
    { key: 'problemSolving', label: 'Problem-Solving' },
    { key: 'investmentProspects', label: 'Investment Prospects' },
    { key: 'competition', label: 'Competition' },
    { key: 'scalability', label: 'Scalability' },
    { key: 'revenueModel', label: 'Revenue Model' },
    { key: 'technicalFeasibility', label: 'Technical Feasibility' },
    { key: 'legalCompliance', label: 'Legal & Compliance' }
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Idea Analysis Report</Text>
          <Text style={styles.subtitle}>{idea.title}</Text>
          <Text style={{ fontSize: 12 }}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.paragraph}>{idea.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Score: {idea.scores.overall}/10</Text>
          <View style={styles.scoreBar}>
            <View
              style={{
                ...styles.scoreBarFill,
                width: `${idea.scores.overall * 10}%`,
                backgroundColor: getScoreColor(idea.scores.overall)
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Scores</Text>
          {scoreCategories.map(category => {
            const score = idea.scores[category.key as keyof typeof idea.scores];
            return (
              <View key={category.key}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>{category.label}</Text>
                  <Text style={styles.scoreValue}>{score}/10</Text>
                </View>
                <View style={styles.scoreBar}>
                  <View
                    style={{
                      ...styles.scoreBarFill,
                      width: `${score * 10}%`,
                      backgroundColor: getScoreColor(score)
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Analysis Report Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analysis Report</Text>
          {Object.entries(idea.report).map(([key, section]) => (
            <View key={key}>
              <Text style={styles.sectionTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text style={styles.scoreValue}>Score: {section.score}/10</Text>

              {/* Details */}
              {Object.entries(section.details).map(([detailKey, detailValue]) => (
                <Text key={detailKey} style={styles.paragraph}>
                  {detailKey.replace(/([A-Z])/g, ' $1')}: {detailValue}
                </Text>
              ))}

              <View style={styles.scoreBar}>
                <View
                  style={{
                    ...styles.scoreBarFill,
                    width: `${section.score * 10}%`,
                    backgroundColor: getScoreColor(section.score)
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Generated by IdeaEvaluator • www.ideaevaluator.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
