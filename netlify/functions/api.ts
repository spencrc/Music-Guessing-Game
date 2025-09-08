import express from "express";
import serverless from "serverless-http";

import helloRouter from "../../backend/hello.ts"

const api = express();

api.use("/api/", helloRouter);

export const handler = serverless(api);