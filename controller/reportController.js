const Report = require('../models/reportModel')

//*********************    get   Reports   By  Status   *****************/

module.exports.getReportsByStatus = async function (req, resp) {
    try {
        const status = req.params.status;
        // Find all reports with the specified status
        const reports = await Report.find({ status }).select('-updatedAt -createdAt -__v');

        if (reports.length === 0) {
            resp.status(404).json({ message: `No reports found with status: ${status}` });
        } else {
            resp.json({
                message: `List of all the reports with ${status}`,
                reports: reports,
            });
        }
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Server error' });
    }

}