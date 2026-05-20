const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json()) // request body m data allowed
app.use(cookieParser()) // to parse the cookie from the request
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://ai-interview-studio-phi.vercel.app',
];

app.use(cors({
    origin: allowedOrigins, // frontend URLs
    credentials: true, // allow cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
/* require all routes*/
const authRouter = require('./routes/authRouter');
const interviewRouter = require('./routes/interview.routes');
const adminRouter = require('./routes/adminRouter');

/* use all routes */
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/admin', adminRouter);

module.exports = app;
