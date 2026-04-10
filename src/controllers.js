const pool = require('./db');
const { addSchoolSchema, listSchoolsSchema } = require('./schema');

const addSchool = async (req, res) => {
    try {
        const validatedData = addSchoolSchema.parse(req.body);
        const { name, address, latitude, longitude } = validatedData;

        const [result] = await pool.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({
            message: "School added successfully",
            schoolId: result.insertId
        });
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const listSchools = async (req, res) => {
    try {
        const validatedQuery = listSchoolsSchema.parse(req.query);
        const { latitude, longitude } = validatedQuery;

        // Haversine formula in SQL
        const query = `
            SELECT id, name, address, latitude, longitude,
            (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance
            FROM schools
            ORDER BY distance ASC
        `;

        const [schools] = await pool.execute(query, [latitude, longitude, latitude]);

        res.status(200).json(schools);
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addSchool,
    listSchools
};
