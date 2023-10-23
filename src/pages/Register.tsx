import { useState } from "react";
import Header from "../components/HeaderComponent";
import Input from "../components/Input";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.signup(username);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header
        heading="Create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />

      <form onSubmit={handleSubmit}>
        <Input
          key={"username"}
          handleChange={handleChange}
          value={username}
          labelText="Username"
          labelFor="username"
          id="username"
          name="Username"
          type="text"
          placeholder="Username"
        />
        <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
          Sign Up
        </button>
      </form>
    </>
  );
}
