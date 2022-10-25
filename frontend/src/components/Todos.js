import React, { useState, useEffect } from "react";
import "../styles/Todos.css";
import SearchBar from "../components/SearchBar";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
const Task = () => {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTask, setFilteredTask] = useState([]);
  const [editTodos, setEditTodos] = useState(null);

  useEffect(() => {
    fetchData();
  }, [inputText]);

  useEffect(() => {
    filterTodos();
  }, [tasks, status, editTodos]);

  const fetchData = async () => {
    try {
      let resp = await fetch(
        `${process.env.REACT_APP_API_URL}/api/getTodos/${localStorage.getItem(
          "email"
        )}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      let data = await resp.json();
      setTasks([...data]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("after fetchihng data", tasks);
  const filterTodos = () => {
    switch (status) {
      case "done":
        setFilteredTask(tasks.filter((task) => task.completed === true));
        break;

      case "pending":
        setFilteredTask(tasks.filter((task) => task.completed === false));
        break;

      default:
        setFilteredTask(tasks);
        break;
    }
  };

  return (
    <div className="app__todo">
      <h1 className="todo_heading"> Add Item to you list... </h1>
      <SearchBar tasks={tasks} setTasks={setTasks} />
      <AddTodo
        tasks={tasks}
        setTasks={setTasks}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
        editTodos={editTodos}
        setEditTodos={setEditTodos}
      />
      <TodoList
        setTasks={setTasks}
        tasks={tasks}
        filteredTask={filteredTask}
        setEditTodos={setEditTodos}
        editTodos={editTodos}
      />
    </div>
  );
};

export default Task;
