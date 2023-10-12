require('dotenv').config()
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//***************     doctor register  *********************/
module.exports.doctorRegister = async function (req, resp) {
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

//*********************   doctor login    *************************/
module.exports.doctorLogin = async function (req, resp) {
    try {
        const { name, password } = req.body;
        // Validate input data
        if (!name || !password) {
            return resp.status(400).json({ message: 'Missing required fields' })
        }
        // check if doctor with the provided name exists or not
        const doctor = await Doctor.findOne({ name: req.body.name });
        if (doctor) {

            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, doctor.password)

            if (!passwordMatch) {
                return resp.status(401).json({ message: 'Invalid username or password' })
            }
            // Generate a JWT token
            const token = jwt.sign({ doctorName: name, doctorID: doctor._id }, process.env.SECRET_KEY, {
                expiresIn: '1h', // token expires in 1 hour
            });

            // Return the JWT token to the client
            return resp.status(200).json({
                message: 'Login in successful',
                doctorID: doctor._id,
                Name: doctor.name,
                data: {
                    token,
                },
            });
        } else {

        }
    } catch (error) {
        console.error('Error login doctor:', error);
        return resp.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

