const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const InterviewReportModel = require('../models/interview.model');

exports.genrateinterViewReport = async (req, res) => {
    try {
       const resumeContent  =  await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        //console.log(interviewReportByAI);

        const interviewReport = new InterviewReportModel({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAI
        });
     
        await interviewReport.save();

        res.status(201).json({
            message: "interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.getInterviewReportById = async (req, res) => {
    try{
        const { id } = req.params;
        const interviewReport = await InterviewReportModel.findById(id);

        if(interviewReport.user.toString() !== req.user.id){
            return res.status(403).json({ error: "You are not authorized to view this report" });
        }
        res.status(200).json({
            interviewReport
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });

    }

}

exports.getAllInterviewReports = async (req, res) => {

    try{
        const allInterviewReports = await InterviewReportModel.find({user: req.user.id}).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
    if(!allInterviewReports){
        return res.status(404).json({ error: "No interview reports found" });
    }
    res.status(200).json({
        allInterviewReports
    });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
