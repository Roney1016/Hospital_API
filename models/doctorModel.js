const mongoose = require('mongoose');

//  doctor schema
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema);