import express from "express";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./config/config.js";

import authRoutes from "./routes/auth.routes.js";

import { __dirname } from "./config/config.js";

const app = express();
const port = 3000;
const clientPath = path.resolve(__dirname, "../../../client");

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(clientPath));

app.use("/api/auth", authRoutes);

app.get("/auth", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
