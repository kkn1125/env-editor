import { editorRequest } from "./request";

export async function getEnvFileContents(path: string) {
  const { data } = await editorRequest.post(
    `/editor/files/${encodeURIComponent(path)}`
  );
  return data;
}
