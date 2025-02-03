import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});

app.get(`/api/v1/version`, (req, res) => {
  const respObj: RespExampleType = {
    id: 1,
    version: packageJSON.version,
    envVal: process.env.ENV_VALUE as string, // sample server-side env value
  };
  res.send(respObj);
});

app.use(express.static("./.local/vite/dist"));

export default app;
