import React from "react";
import { ITodo } from "../TodoService";

interface TodoProps {
  todo: ITodo;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete }) => {
  const { id, title } = todo;

  return (
    <div className={`bg-white p-4 mb-4 rounded-md shadow-md`}>
      <div className="flex justify-between items-center">
        <span className="text-gray-900">{title}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-purple-600 hover:text-purple-500 font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
