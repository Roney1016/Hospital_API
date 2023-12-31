const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addharNumber: {
        type: Number,
        required: true
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);