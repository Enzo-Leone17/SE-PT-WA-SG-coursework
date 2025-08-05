//require models
const { Doctor} = require("../models");
//const redis = require("../config/redis");


//get doctors by specialty
const getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialty } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    console.log("Specialty:", specialty);

    if (!specialty) {
      return res.status(400).json({ error: "Specialty not specified!" });
    }
    //cache
    // const cacheKey = `doctors:specialty:${specialty}:page:${page}:limit:${limit}`;
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //   console.log("Cache hit for:", cacheKey);
    //   return res.json(JSON.parse(cachedData));
    // }

    const { count, rows: doctors } = await Doctor.findAndCountAll({
      where: {
        specialty: specialty,
        is_deleted: false,
      },
      limit,
      offset,
    });
    const response = {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      doctors,
    };

    //await redis.setEx(cacheKey, 300, JSON.stringify(response)); // 5mins cache
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve doctor information",
      details: err.message,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    let queryObj = {};
    queryObj.is_deleted = false;
    if (req.query?.id) {
      queryObj.id = req.query?.id;
    }
    if (req.query?.name) {
      queryObj.name = req.query?.name;
    }
    if (req.query?.specialty) {
      queryObj.specialty = req.query?.specialty;
    }
    if (req.query?.phone) {
      queryObj.phone = req.query?.phone;
    }
    if (req.query?.email) {
      queryObj.email = req.query?.email;
    }
    console.log(queryObj);
    //cache
    // const cacheKey = `doctors:all:page:${page}:limit:${limit}`;
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //   console.log("Cache hit for:", cacheKey);
    //   return res.json(JSON.parse(cachedData));
    // }

    const { count, rows: doctors } = await Doctor.findAndCountAll({
      where: queryObj,
      limit,
      offset,
    });
    const response = {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      doctors,
    };

    // await redis.setEx(cacheKey, 300, JSON.stringify(response)); // 5mins cache
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve doctor information",
      details: err.message,
    });
  }
};

const getUniqueDoctorSpecialties = async (req, res) => {
  try {
    const specialties = await Doctor.findAll({
      attributes: ["specialty"],
      group: ["specialty"],
    });
    let result = specialties.map((specialty) => specialty.specialty);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDoctorsBySpecialty , getAllDoctors, getUniqueDoctorSpecialties};
