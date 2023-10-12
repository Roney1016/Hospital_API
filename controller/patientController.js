const Patient = require('../models/patientModel');
const Report = require('../models/reportModel');
var moment = require('moment');
moment().format();
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


module.exports.createPatientReport = async function (req, resp) {
    try {
        //Extract the patient's ID from the url parameters
        const patientId = req.params.id;
        console.log(patientId)
        //check if the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return resp.status(404).json({ message: 'patient not found' })

        }
        let doctor = req.user;
        // check doctor authorized or not
        if (!doctor) {
            return resp.status(401).json({ message: 'Doctor not found or unauthorized' });
        }

        //Extract report details from the req.body
        const { status } = req.body;
        if (!status) {
            return resp.status(401).json({ message: 'Plz enter a status filed' });
        }
        console.log(doctor)
        const reportData = {
            createdByDoctorID: doctor.doctorID,
            doctorName: doctor.doctorName,
            patientID: patientId,
            patientName: patient.name,
            patientAadharNumber: patient.addharNumber,
            status,
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        }

        // create new report
        const report = await Report.create(reportData);
        await report.save();

        //update the patient's reports array
        patient.reports.push(report);
        await patient.save();

        return resp.status(201).json({
            message: 'Patient report created successfully',
            report: report
        })
    } catch (error) {
        console.error('Error creating patient report:', error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }

}