import { PROJECT_NAME, VERSION } from "@src/src/common/variables";
import { spawn, spawnSync } from "child_process";
import fs from "fs";

export class EnvEditor {
  projectName: string = PROJECT_NAME;
  version: string = VERSION;

  loadEnv() {
    // const list = fs.readdirSync(envPath);
    const result = spawnSync("find", [
      ".",
      "..",
      "-maxdepth",
      "2",
      "-name",
      ".env*",
    ]);
    const output = result.output.filter((output) => (output?.length ?? 0) > 0);

    const one = output[0]?.toString("utf-8") || "";
    const list = one.split("\n").filter((path) => !!path.trim());
    return list;
  }

  openEnv(filepath: string) {
    const env = fs.readFileSync(filepath);
    const fileContent = env.toString("utf-8");
    return fileContent;
  }

  saveChangeEnvContent(path: any, content: any) {
    try {
      fs.writeFileSync(path, content);
      return true;
    } catch (error) {
      throw new Error("file save error");
    }
  }
}
