import { editorRequest } from "./request";

export async function findEnvFiles() {
  const { data } = await editorRequest.get("/editor/files");
  return data;
}
