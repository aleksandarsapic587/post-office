import express from "express";
import { getPostOffices, createPostOffice, updatePostOffice, deletePostOffice } from "../controllers/postOffice.controller.js";

const router = express.Router();

router.get("/", getPostOffices);
router.post("/", createPostOffice);
router.put("/:id", updatePostOffice);
router.delete("/:id", deletePostOffice);

export default router;
