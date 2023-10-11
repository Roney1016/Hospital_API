
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');

module.exports.doctorRegister = async function (req, resp) {            // Doctor Register
    try {
        const { name, password } = req.body;
        // Validate input data
        if (!name || !password) {
            return resp.status(400).json({ message: 'Missing required fields' })
        }
        // Check if a doctor with the same name already exists
        const exitingDoctor = await Doctor.findOne({ name: name });
        if (!exitingDoctor) {

            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create the new doctor
            const newDoctor = await Doctor.create({
                name: name,
                password: hashedPassword
            })
            return resp.status(200).json({
                message: 'Doctor registered successfully',
                doctorID: newDoctor._id,
                Name: newDoctor.name
            })
        } else {

            return resp.status(200).json({ message: 'doctor is already exists' })
        }

    } catch (error) {
        console.error('Error registering doctor:', error);
        return resp.status(500).json({
            message: 'Internal Server Error',
        });
    }

}