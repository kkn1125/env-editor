import { EnvEditor } from "@module/env.editor";
import { Router } from "express";

const editorRouter = Router();

editorRouter.get("/files", (req, res) => {
  const editor = new EnvEditor();
  const envList = editor.loadEnv();
  res.json({
    ok: true,
    data: envList,
  });
});

editorRouter.post("/files/:filepath", (req, res) => {
  const filepath = req.params.filepath;
  const editor = new EnvEditor();
  const envFileContent = editor.openEnv(filepath);
  res.json({
    ok: true,
    data: envFileContent,
  });
});

editorRouter.post("/files", (req, res) => {
  const path = req.body.path;
  const content = req.body.content;
  const editor = new EnvEditor();
  const result = editor.saveChangeEnvContent(path, content);
  res.json({
    ok: true,
    data: result,
  });
});

export default editorRouter;
