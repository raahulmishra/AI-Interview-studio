require('dotenv').config();
const app = require('./src/app');
const connectToDatabase = require('./src/config/database');

connectToDatabase();

// genrateInterviewReport({ resume, selfDescription, jobDescription });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})