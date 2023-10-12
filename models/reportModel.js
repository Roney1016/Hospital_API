const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    createdByDoctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    doctorName: {
        type: String,
        ref: 'Doctor',
    },
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    patientName: {
        type: String,
        ref: 'Patient',
    },
    patientAadharNumber: {
        type: Number,
        ref: 'Patient',
    },

    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true
    },
    date: {
        type: String,
        default: Date.now

    }

}, {
    timestamps: true
})


module.exports = mongoose.model('Report', reportSchema);