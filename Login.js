import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username.trim());
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-sky-700 text-center">
          Maritime Login
        </h2>
        <label className="block mb-2 text-sky-600 font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Enter username"
        />
        <label className="block mb-2 text-sky-600 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
