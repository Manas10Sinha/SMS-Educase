import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

router.post("/addSchool", controller.addSchool);
router.get("/listSchools", controller.listSchools);
router.put("/updateSchool", controller.updateSchool);

export default router;
