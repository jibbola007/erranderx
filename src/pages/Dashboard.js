import React, { useState, useEffect } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchData = async () => {
      const tasksResponse = await fetch("http://localhost:5000/tasks");
      const tasksData = await tasksResponse.json();
      setTasks(tasksData);
    };

    fetchData();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "") return;

    const newTaskObject = {
      name: newTask,
      status: "In Progress",
    };

    // Post new task to the backend
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskObject),
    });

    const addedTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, addedTask]);
    setNewTask(""); // Clear the input field
  };

  // Update task status (mark as complete)
  const toggleTaskStatus = async (id, currentStatus) => {
    const updatedStatus = currentStatus === "In Progress" ? "Completed" : "In Progress";

    const updatedTask = { ...tasks.find((task) => task.id === id), status: updatedStatus };

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const updatedTaskData = await response.json();
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTaskData : task))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      <div className="mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Add Task
        </button>
      </div>

      <div className="task-list">
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>
        <ul className="list-none">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`bg-gray-100 p-4 rounded-lg mb-3 shadow-md ${
                task.status === "Completed" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <h3 className="text-xl font-medium">{task.name}</h3>
              <p>Status: {task.status}</p>
              <button
                onClick={() => toggleTaskStatus(task.id, task.status)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                {task.status === "In Progress" ? "Mark as Complete" : "Mark as In Progress"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;