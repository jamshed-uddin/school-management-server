const joi = require("joi");

// @desc: Get all schools
// POST /api/schools
// @access: Public

const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const db = req.app.locals.db;

    const schema = joi.object({
      name: joi.string().required().messages({
        "any.required": "Name is required",
        "string.base": "Name must be a string",
      }),
      address: joi.string().required().messages({
        "any.required": "Address is required",
        "string.base": "Address must be a string",
      }),
      latitude: joi.number().required().messages({
        "any.required": "Latitude is required",
        "number.base": "Latitude must be a number",
      }),
      longitude: joi.number().required().messages({
        "any.required": "Longitude is required",
        "number.base": "Longitude must be a number",
      }),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    await db.query(
      `
          INSERT INTO schools (name, address, latitude, longitude)
       VALUES (?, ?, ?, ?)   `,
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: "School added successfully",
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// @desc: Get all schools
// GET /api/schools
// @access: Public
const getSchools = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { latitude, longitude } = req.query;
    const limit = +req.query.limit || 15;
    const page = +req.query.page || 1;

    const schema = joi.object({
      latitude: joi.number().required().messages({
        "any.required": "User latitude is required",
        "number.base": "Latitude must be a number",
      }),
      longitude: joi.number().required().messages({
        "any.required": "User longitude is required",
        "number.base": "Longitude must be a number",
      }),
    });

    const { error, value } = schema.validate({ latitude, longitude });

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const totalSchools = await db.query(`
    SELECT COUNT(*) as total FROM schools
    `);

    const totalPages = Math.ceil(totalSchools[0][0].total / limit);

    const offset = (page - 1) * limit;

    const schools = await db.query(
      `
              SELECT id, name, address, latitude, longitude
              FROM schools
              ORDER BY POW(latitude-?,2)+ POW(longitude-?, 2) ASC
              LIMIT ? OFFSET ?`,
      [value.latitude, value.longitude, limit, offset]
    );

    const response = {
      data: schools[0],
      pagination: {
        page,
        limit,
        totalSchools: totalSchools[0][0].total,
        totalPages: totalPages,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  addSchool,
  getSchools,
};
