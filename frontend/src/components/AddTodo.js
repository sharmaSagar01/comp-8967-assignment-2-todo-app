import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import "../styles/AddTodo.css";

const AddTodo = ({
  setInputText,
  tasks,
  inputText,
  setTasks,
  setStatus,
  editTodos,
  setEditTodos,
}) => {
  const updateTask = async (todo, completed, id, createdBy) => {
    try {
      let resp = await fetch(
        `${process.env.REACT_APP_API_URL}/api/updateTodo/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            task: todo,
            completed: completed,
            _id: id,
            createdBy: createdBy,
          }),
        }
      );

      setInputText("");
    } catch (error) {
      console.log(error.message);
    }

    setTasks(
      tasks.map((item) => (item.id === id ? { todo, completed, id } : item))
    );

    setEditTodos("");
  };

  useEffect(() => {
    if (editTodos) {
      setInputText(editTodos.task);
    } else {
      setInputText("");
    }
  }, [setInputText, editTodos]);

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!editTodos) {
      try {
        let resp = await fetch(
          `${process.env.REACT_APP_API_URL}/api/addTodos`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              task: inputText,
              createdBy: localStorage.getItem("email"),
            }),
          }
        );

        setInputText("");
      } catch (error) {
        console.log(error);
        alert(`error: ${e.message}`);
      }
    } else {
      updateTask(
        inputText,
        editTodos.completed,
        editTodos._id,
        editTodos.createdBy
      );
    }
  };

  const selectStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="form-add-todo">
      <form onSubmit={addTask}>
        <input
          type="text"
          className="todo_input"
          placeholder="Add item to TodoList"
          onChange={handleInputText}
          value={inputText}
          required
        />
        <button className="todo_input_add" type="submit">
          {!editTodos ? <AddIcon /> : "Update"}
        </button>
        <div className="select_state">
          <select onChange={selectStatus} name="todos" className="todo-filter">
            <option value="all"> All </option>
            <option value="done"> Done</option>
            <option value="pending"> Pending</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
