const { z } = require('zod');

const addSchoolSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
});

const listSchoolsSchema = z.object({
    latitude: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Latitude must be a valid number",
    }).transform(Number),
    longitude: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Longitude must be a valid number",
    }).transform(Number)
});

module.exports = {
    addSchoolSchema,
    listSchoolsSchema
};
