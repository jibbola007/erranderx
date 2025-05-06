import { useEffect, useState } from "react";

function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description} — <strong>{task.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;