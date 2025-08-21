import { School } from "../models/school.js";
import { z } from "zod";
const addSchoolSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const addSchool = async (req, res) => {
  try {
    const parsed = addSchoolSchema.parse({
      name: req.body.name,
      address: req.body.address,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
    });
    const school = new School(
      parsed.name,
      parsed.address,
      parsed.latitude,
      parsed.longitude
    );
    await school.save();
    res.json({ message: "School added successfully", school });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listSchools = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng required" });
  }
  try {
    const [rows] = await School.findNearByLocation(Number(lat), Number(lng));
    res.json({ schools: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSchool = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "latitude and longitude required" });
  }
  try {
    const parsed = addSchoolSchema.parse({
      name: req.body.name,
      address: req.body.address,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
    const school = new School(
      parsed.name,
      parsed.address,
      parsed.latitude,
      parsed.longitude
    );
    await school.save(parsed.latitude, parsed.longitude);
    res.json({ message: "School updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
