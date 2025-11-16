"use client";

import {   useEffect, useState } from "react"

export default function Home() {
  const [message, setMessage] = useState<string>("Loading...");
  const [name , setName] = useState<string>("");
  const [response , setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/greet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

     const data = await res.json();
    setResponse(data.message);

    if(!res.ok) {
      setError(data.message || "Something went wrong!");
    } else {
      setResponse(data.message);
    }

   

    } catch (err) {
      setError("An error occurred while fetching the greeting.");
    }

    setLoading(false);
   

  }

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Error fetching message"));
  }, []);

  return (
  <div>
    <h1>Hello From Next JS</h1>
     <p className="text-green-600 text-lg font-medium">{message}</p>
     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
        className="border p-2 mr-2"
      />
      <button type="submit" disabled={loading} className={`w-full text-white font-semibold py-2 rounded-lg transition 
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>{loading ? "Processing.. " : "Say Hello"}</button>
     </form>
     {response && <p className="mt-4 text-purple-600 font-semibold">{response}</p>}
  </div>
  )
}
