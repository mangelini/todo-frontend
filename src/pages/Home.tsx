import { useEffect, useState } from "react";
import TodoService, { ITodo } from "../TodoService";
import TodoList from "../components/TodoList";
import { useAuth } from "../components/AuthProvider";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const user = useAuth().user;

  const fetchData = async () => {
    try {
      if (user) {
        const data = await TodoService.getTodos(user.id, user.username);
        setTodos(data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTodo = async () => {
    if (newTodoTitle.trim() === "") return;

    try {
      if (user) {
        const data = await TodoService.createTodo(
          user.username,
          user.id,
          newTodoTitle
        );
        setTodos((prevTodos) => [...prevTodos, data]);
        setNewTodoTitle("");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      if (user) {
        await TodoService.deleteTodo(user.username, id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Todo List</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
        <button
          onClick={handleCreateTodo}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 ml-2 rounded-md"
        >
          Add
        </button>
      </div>
      <TodoList todos={todos} onDelete={handleDeleteTodo} />
    </div>
  );
}
