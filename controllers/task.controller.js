//touch the database, use async and await

import Task from "../models/task.models.js";

//Create a new Task
const newTask = async (req, res) => {
  try {
    //Extract the details from request body

    const { title, description, due_date } = req.body;

    //Validation on the incoming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description not found" });
    }

    // create document based on our schema
    await Task.create({ title, description, due_date });

    res.status(200).json({
      success: true,
      message: "Created a task",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error Creating a task",
    });
  }
};

//Read all tasks
const getTasks = async (req, res) => {
  try {
    let options = {};
    const tasks = await Task.find({}, null, options);
    res.status(200).json({
      success: true,
      tasks,
      message: "Fetched all tasks",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error Creating a task",
    });
  }
};

//Update a task
const updateTask = async (req, res) => {
  try {
    //Extract the ID from parameters
    const { id } = req.params;
    const { title, description, due_date } = req.body;
    //Validation
    if (!id) {
      return res.status(400).json({ message: "Task Id is required" });
    }
    // find the document using ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //Update the task on the paticular document

    if (title) task.title = title;
    if (description) task.description = description;
    if (due_date) task.due_date = due_date;
    if (!due_date) task.due_date = null;
    //Save the tasks

    const updateTask = await task.save();
    //give a response
    res.status(200).json({
      success: true,
      updateTask,
      message: "task updated succesfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating a task",
    });
  }
};

//Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    //Validation
    if (!id) {
      return res.status(400).json({ message: "Task Id is required" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "deleted a task",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error While deleting the task",
    });
  }
};

export { newTask, getTasks, updateTask, deleteTask };
