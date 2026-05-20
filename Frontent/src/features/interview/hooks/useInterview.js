import { useContext } from 'react';
import { InterviewContext } from '../interview.contect';
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById
} from '../service/interview.api.js';

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async ({ jobDescription, selfDescription, resume }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume
      });

      setReport(response.interviewReport);
      return response.interviewReport;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } finally {
      setLoading(false);
    }
  };

  const getAllReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.allInterviewReports ?? []);
      return response.allInterviewReports ?? [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports
  };
};
