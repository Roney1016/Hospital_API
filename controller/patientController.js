const Patient = require('../models/patientModel');

module.exports.patientRegister = async function (req, resp) {
    try {
        const { name, phone, city, addharNumber } = req.body;

        // Validate input data
        if (!name || !phone || !city || !addharNumber) {
            return resp.status(400).json({ message: 'Missing required fields.' });
        }
        // Check if the Aadhar number has exactly 12 digits
        if (addharNumber.toString().length != 12) {
            return resp.status(400).json({ message: 'Aadhar number must be exactly 12 digits.' })
        }

        // check if patient is already exists or not
        const existPatient = await Patient.findOne({ addharNumber });
        if (existPatient) {
            return resp.status(200).json({
                message: 'A patient already exists with this Aadhar Register',
                patientID: existPatient._id,
                patientName: existPatient.name
            })
        } else {
            //new registation of patient
            const newPatient = await Patient.create({
                name,
                phone,
                city,
                addharNumber
            });

            return resp.status(200).json({
                message: 'new Patient registered successfully',
                patientID: newPatient._id,
                patientName: newPatient.name
            })
        }
    } catch (error) {
        console.error('Error registering doctor:', error);
        return resp.status(500).json({
            message: 'Internal Server Error',
        })
    }
}