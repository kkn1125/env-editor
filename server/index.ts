import router from "@routes/index";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

const MODE = process.env.NODE_ENV || "production";

dotenv.config({
  path: path.join(path.resolve(), "../.env"),
});
dotenv.config({
  path: path.join(path.resolve(), `../.env.${MODE}`),
});

const host = process.env.SERVER_HOST || "localhost";
const port = +(process.env.SERVER_PORT || 8080);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`🪵 [${req.method.toUpperCase()}] ${req.originalUrl} --->`);
  next();
});

app.use("/api", router);

app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});
