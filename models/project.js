const mongoose = require('mongoose');
const validator = require('validator');

const projectsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    status: {
        type: String,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;