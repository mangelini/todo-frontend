import React from "react";
import Todo from "./Todo";
import { ITodo } from "../TodoService";

interface TodoListProps {
  todos: ITodo[];
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    return <div>No todos available.</div>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;
