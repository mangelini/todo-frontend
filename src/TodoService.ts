import axios from "axios";

export interface ITodo {
  id: number;
  title: string;
  author_id: number;
}

class TodoService {
  async getTodos(id: number, username: string) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NEST + "todos?author_id="}${id}`,
        {
          headers: {
            Authorization: `Bearer ${username}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  async createTodo(username: string, author_id: number, title: string) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_NEST + "todos",
        {
          title,
          author_id,
        },
        {
          headers: {
            Authorization: `Bearer ${username}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  async deleteTodo(username: string, id: number) {
    try {
      await axios.delete(`${import.meta.env.VITE_NEST + "todos"}/${id}`, {
        headers: {
          Authorization: `Bearer ${username}`,
        },
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }
}

export default new TodoService();
