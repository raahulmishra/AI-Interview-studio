const mongoose = require('mongoose');

/* SubSchemas */
const technicalQeustionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Technical Question is required"]  },
    intention: { type: String, required: [true, "Intention is required"] },
    answers: { type: String, required: [true, "Answer is required"] }

},{_id: false});

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Behavioral Question is required"]  },
    intention: { type: String, required: [true, "Intention is required"] },
    answers: { type: String, required: [true, "Answer is required"] }
},{_id: false});

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: [true, "Severity is required"]
    },
},{_id: false});

const preprationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required: [true, "Day is required"]
    },
    focusArea: {
        type: String,
        required: [true, "Focus Area is required"]
    },
    task:[{
        type: String,
        required: [true, "Task is required"]
    }]
})

/* Main Schema */
const interviewSchema = new mongoose.Schema({
    jobDescription: { 
        type: String, required: true 
    },
    resume:{
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQeustionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preprationPlanSchema],
    user:{
       type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title: {
        type: String,
        required: [true, "Job Title is required"]
    }
},{timestamps: true});  

const InterviewReportModel = mongoose.model('InterviewReport', interviewSchema);

module.exports = InterviewReportModel;