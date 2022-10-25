import React, { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/Todo.css";

const Todo = ({
  todo,
  id,
  completed,
  tasks,
  setTasks,
  setEditTodos,
  editTodos,
}) => {
  const completeTask = async () => {
    try {
      let resp = await fetch(
        `${process.env.REACT_APP_API_URL}/api/toogleStatus/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };


  const editTask = () => {
    setEditTodos(tasks.find((item) => item._id === id));
  };
  

  const deleteTask = async () => {
    try {
      let resp = await fetch(
        `${process.env.REACT_APP_API_URL}/api/deleteTodos/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {}

    window.location.reload(false);
  };

  return (
    <div className="todo">
      <div className="todo_items">
        {completed ? (
          <li className="todo_item_completed">{todo}</li>
        ) : (
          <li className="todo_item">{todo ? todo : ""}</li>
        )}
      </div>
      <div className="todo_buttons">
        <button className="complete_button" onClick={completeTask}>
          <CheckIcon className="complete-icon" />
        </button>
        {!completed ? (
          <button className="edit_button" onClick={editTask}>
            <EditIcon className="edit-icon" />
          </button>
        ) : (
          ""
        )}

        <button className="delete_button" onClick={deleteTask}>
          <DeleteForeverIcon className="delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
