const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telnum:  {
        type: Number,
        required: true
    },
    agree: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ['Tel.', 'email']
    },
    message:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

var Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;