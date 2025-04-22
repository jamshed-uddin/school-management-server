// @desc: Get all schools
// POST /api/schools
// @access: Public

const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || !latitude || !longitude) {
      return res
        .status(400)
        .send({ message: "Please fill all the required fields" });
    }
    const addedSchool = await db.query(
      `
      INSERT INTO schools (name, address, latitude, longitude)
   VALUES (?, ?, ?, ?)    `,
      [name, address, latitude, longitude]
    );

    res.status(200).json({
      message: "School added successfully",
      data: addedSchool[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// @desc: Get all schools
// GET /api/schools
// @access: Public
const getSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    const limit = req.query.limit || 10;
    const offset = req.query.skip || 0;
    const page = req.query.page || 1;

    const totalSchools = await db.query(`
    SELECT COUNT(*) as total FROM schools
    `);

    const totalPages = Math.ceil(totalSchools[0][0].total / limit);

    const schools = await db.query(
      `
              SELECT id, name, address, latitude, longitude FROM schools LIMIT ? OFFSET ?`,
      [limit, offset]
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
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  addSchool,
  getSchools,
};
