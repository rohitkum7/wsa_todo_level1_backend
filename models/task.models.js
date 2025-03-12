import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  due_date: Date,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
