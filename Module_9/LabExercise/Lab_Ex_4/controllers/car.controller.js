const axios = require("axios");

const url =
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records";

const getAllCars = async (req, res) => {
  const offsetParam = req.query?.offset ? `&offset=${req.query.offset}` : "";

  const limitParam = req.query?.limit ? `&limit=${req.query.limit}` : "";

  const selectParam = req.query?.select ? `select=${req.query.select}` : "select=make, model, drive, trany, year";

  const whereParam = req.params.brand ? `&where="${req.params.brand}"` : "";

  const finalUrl = `${url}?${selectParam}${limitParam}${offsetParam}${whereParam}`;
  console.log(finalUrl);
  try {
    const response = await axios.get(finalUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCars };
