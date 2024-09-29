import { editorRequest } from "./request";

export async function saveChangeEnvContent(path: string, content: string) {
  const { data } = await editorRequest.post("/editor/files", {
    path,
    content,
  });
  return data;
}
