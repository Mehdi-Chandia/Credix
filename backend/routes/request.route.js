import express from "express";
import {
    allRequests,
    createRequest,
    myRequests,
    singleRequest,
    updateStatus
} from "../controllers/request.controller.js";
import upload from "../middleware/multer.js";
import {isAdmin, verifyToken} from "../middleware/auth.js";
const router = express.Router();

router.post("/create",verifyToken,upload.array("documents",5),createRequest)
router.get("/allRequests",verifyToken,allRequests)
router.put("/update/:id",verifyToken,isAdmin,updateStatus)
router.get("/myRequests",verifyToken,myRequests)
router.get("/credential/:id",verifyToken,singleRequest)

export default router;