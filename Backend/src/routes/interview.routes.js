const express = require('express');
const interviewRoutes = express.Router();
const authmiddleware = require('../middleware/authmiddleware');
const upload = require('../middleware/file.middleware');
const interviewController = require('../controllers/interview.controller');

const handleResumeUpload = (req, res, next) => {
    upload.single("resume")(req, res, (error) => {
        if (error) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: "Resume PDF must be 5MB or smaller" });
            }

            return res.status(400).json({ error: error.message || "Could not upload resume PDF" });
        }

        next();
    });
};

/**
 * @route POST /api/interview
 * @desc Generate interview report based on resume pdf, self-description, and job description
 * @access Private (requires authentication)
 * @body { resume: string, selfDescription: string, jobDescription: string }
 * @returns { matchScore: number, technicalQuestions: array, softSkillsAnalysis: string }
 */

interviewRoutes.post('/', authmiddleware, handleResumeUpload, interviewController.genrateinterViewReport);

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
