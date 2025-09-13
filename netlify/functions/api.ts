import express from "express";
import serverless from "serverless-http";

import daysRouter from "../../backend/routes/days.ts"

const api = express();

api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

api.use("/api/days", daysRouter);

export const handler = serverless(api);