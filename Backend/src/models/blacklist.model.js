const mongoose = require('mongoose');
const blackelistTokenSchema = new mongoose.Schema({
    token: {
        type: String,   
        required: [true, 'Token is required']
    }
   
},{timestamps: true});

const blacklistToken = mongoose.model('BlacklistToken', blackelistTokenSchema);

module.exports = blacklistToken;