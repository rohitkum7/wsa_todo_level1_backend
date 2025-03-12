import mongoose from "mongoose";
import "dotenv/config";

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDb connected.."))
    .catch((err) => {
      console.log("Error while connecting mongoDB", err);
    });
};

export default db;
