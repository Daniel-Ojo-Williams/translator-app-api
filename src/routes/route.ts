import express from 'express';
import { getTranslation } from '../controller/translator';

const router = express.Router();

router.route("/").post(getTranslation);

export default router;

