const express = require('express');
const interviewRoutes = express.Router();
const authmiddleware = require('../middleware/authmiddleware');
const upload = require('../middleware/file.middleware');
const interviewController = require('../controllers/interview.controller');

/**
 * @route POST /api/interview
 * @desc Generate interview report based on resume pdf, self-description, and job description
 * @access Private (requires authentication)
 * @body { resume: string, selfDescription: string, jobDescription: string }
 * @returns { matchScore: number, technicalQuestions: array, softSkillsAnalysis: string }
 */

interviewRoutes.post('/', authmiddleware,upload.single("resume"), interviewController.genrateinterViewReport);

/**
 * @route GET /api/interview/:id
 * @desc Get interview report by ID
 * @access Private (requires authentication)
 * @params { id: string }
 * @returns { interviewReport: object }
 */
interviewRoutes.get('/:id', authmiddleware, interviewController.getInterviewReportById);

/**
 * @route GET /api/interview
 * @desc Get all interview reports for logged in user
 * @access Private (requires authentication)
 * @returns { interviewReports: array of objects }
 */
interviewRoutes.get('/', authmiddleware, interviewController.getAllInterviewReports);

module.exports =  interviewRoutes;