//require models
const { Appointment, Doctor, Patient } = require("../models");
//const redis = require("../config/redis");

//get appointments by patient id
const getAppointmentsByPatientID = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    console.log("Patient ID:", id);

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Valid patient ID is required" });
    }

    //cache
    // const cacheKey = `patient_appointments:${id}:page:${page}:limit:${limit}`;
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //   console.log("Cache hit for:", cacheKey);
    //   return res.json(JSON.parse(cachedData));
    // }

    const { count, rows: appointments } = await Appointment.findAndCountAll({
      where: {
        patient_id: id,
        is_deleted: false,
      },
      include: [
        {
          model: Doctor,
          attributes: ["id", "name", "specialty"],
          where: { is_deleted: false },
        },
        {
          model: Patient,
          attributes: ["id", "full_name", "dob", "email", "phone"],
        },
      ],
      attributes: ["id", "scheduled_at", "status", "notes"],
      limit,
      offset,
    });
    const response = {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      appointments,
    };

    //await redis.setEx(cacheKey, 60, JSON.stringify(response)); // 60s cache
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve patient appointments",
      details: err.message,
    });
  }
};

const createPatient = async (req, res) => {
  try {
    let [full_name, email, phone, dob, address] = Object.values(req.body);
    // Validate required fields and perform data sanitization
    if (!full_name || !dob || !email || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Remove all whitespace from fullname, email, address and phone
    full_name = full_name.trim();
    email = email.trim();
    address = address.trim();
    phone = phone.replace(/\s/g, '');
    dob = dob.trim().replace(/\//g, '-');
    // Validate existed special character
    full_name = full_name.replace(/[^a-zA-Z0-9\s]/g, '');
    // Avoid SQL injection or XSS attacks
    const patient = await Patient.create({
      full_name: full_name,
      dob: new Date(dob),
      phone: phone,
      email: email,
      address: address,
      is_deleted: false,
    });
    res.json(patient);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create patient",
      details: err.message,
    });
  }
};

module.exports = { getAppointmentsByPatientID, createPatient };
