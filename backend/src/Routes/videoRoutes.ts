import express from "express";
import { UploadVideo } from "../controllers/uploadVideo";
import { upload } from "../Middlewares/storage";
import { savedVideoController } from "../controllers/streamVideos";
import { listOfVideosController } from "../controllers/listOfVideos";

const router = express.Router();

router.get('/savedVideos', listOfVideosController)
router.get('/:videoId', savedVideoController)
router.post('/uploadVideo', upload.single('video'), UploadVideo);

export default router