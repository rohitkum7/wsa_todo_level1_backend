import express from "express";
import "dotenv/config";
import cors from "cors";
import db from "./utils/db.js";
import router from "./routes/task.routes.js";

const app = express(); //We are giving express power to app

const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true })); //making encoding accessibile
app.use(express.json()); //accept the data from frontend as an json format

db(); //Connect to the database

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is connected on port ${port}...`);
});
