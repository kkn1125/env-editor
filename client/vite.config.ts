import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const MODE = process.env.NODE_ENV || "production";

  dotenv.config({
    path: path.join(path.resolve(), "../.env"),
  });
  dotenv.config({
    path: path.join(path.resolve(), `../.env.${MODE}`),
  });

  const host = process.env.CLIENT_HOST || "0.0.0.0";
  const port = +(process.env.CLIENT_PORT || 5173);

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host,
      port,
    },
    resolve: {
      alias: [
        {
          find: "@assets",
          replacement: path.join(path.resolve(), "src/assets"),
        },
        {
          find: "@apis",
          replacement: path.join(path.resolve(), "src/apis"),
        },
        {
          find: "@common",
          replacement: path.join(path.resolve(), "src/common"),
        },
        {
          find: "@routes",
          replacement: path.join(path.resolve(), "src/routes"),
        },
        {
          find: "@components",
          replacement: path.join(path.resolve(), "src/components"),
        },
        { find: "@pages", replacement: path.join(path.resolve(), "src/pages") },
        { find: "@src", replacement: path.join(path.resolve(), "src") },
      ],
    },
    plugins: [react()],
  };
});
