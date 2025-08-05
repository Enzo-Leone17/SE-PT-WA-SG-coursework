//get required service
const checkInService = require("../services/checkIn.service");

module.exports = {
    createCompleteCheckin: async (req, res) => {
        try {
            const checkIn = await checkInService.createCompleteCheckin(req);
            res.json(checkIn);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};