import { Router } from "express";
import editorRouter from "./editor.router";

const router = Router();

router.use("/editor", editorRouter);

export default router;
