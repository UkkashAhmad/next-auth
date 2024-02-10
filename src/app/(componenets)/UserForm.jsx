"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({formData}),
      "content-type": "application/json",
    });
    // this is just for checking error we can do this in other ways
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      // this is like a navigate we can use navigate or redirect here too
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
    <form
      onSubmit={handleSubmit}
      method="post"
      className="flex flex-col gap-3 w-1/2"
    >
      <h1>Create New User</h1>
      <label>Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={formData.name}
        required={true}
        placeholder="jhonwick"
        className="m-2 bg-slate-400 rounded"
      />
      <label>Email</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        required={true}
        placeholder="jhonwick@gmail.com"
        className="m-2 bg-slate-400 rounded"
      />
      <label>Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        required={true}
        className="m-2 bg-slate-400 rounded"
      />
      <input
        type="submit"
        value="Create User"
        className="bg-blue-300 hover:bg-blue-100"
      />
    <p className="text-red-500"> {errorMessage} </p>
    </form>
    </>
  );
};

export default UserForm;
