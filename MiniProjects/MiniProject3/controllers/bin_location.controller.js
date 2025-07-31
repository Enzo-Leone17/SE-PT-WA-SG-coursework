//get required service
const binLocationService = require("../services/bin_location.service");

module.exports = {
    getAllBinLocations: async (req, res) => {
        try {
            const binLocations = await binLocationService.getAllBinLocations(
                req, res
            );
            res.status(200).json(binLocations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getBinLocationByID: async (req, res) => {
        try {
            const binLocation = await binLocationService.getBinLocationByID(
                req, res
            );
            res.status(200).json(binLocation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createBinLocation: async (req, res) => {
        try {
            const newBinLocation = await binLocationService.createBinLocation(req, res);
            res.status(201).json(newBinLocation);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateBinLocationByID: async (req, res) => {
        try {
            const updatedBinLocation = await binLocationService.updateBinLocationByID(req, res);
            res.status(200).json(updatedBinLocation);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    deleteBinLocationByID: async (req, res) => {
        try {
            const deletedBinLocation = await binLocationService.deleteBinLocationByID(req, res);
            res.status(200).json(deletedBinLocation);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};