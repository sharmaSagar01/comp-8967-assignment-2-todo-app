import React from "react";
import Todo from "../components/Todo";
const TodoList = ({
  tasks,
  setTasks,
  filteredTask,
  setEditTodos,
  editTodos,
}) => {
  console.log(tasks);
  return (
    <div className="todo_list_container">
      <ul className="todo_list_item">
        {filteredTask.map((task) => (
          <Todo
            key={task._id}
            todo={task.task}
            completed={task.completed}
            id={task._id}
            setTasks={setTasks}
            tasks={tasks}
            setEditTodos={setEditTodos}
            editTodos={editTodos}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
