"use client";

import {   useEffect, useState } from "react";
import DemoToastButton from "./components/DemoToast";
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
     <main className="p-10">
      <h1 className="text-2xl font-bold">Toast Demo</h1>
      <DemoToastButton />
    </main>
    <h1>Hello From Next JS</h1>
     <p className="text-green-600 text-lg font-medium">{message}</p>
     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
        className="w-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" disabled={loading} className={`w-50 ml-3 text-white font-semibold py-2 rounded-lg transition 
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>{loading ? "Processing.. " : "Say Hello"}</button>
     </form>

     {loading && (
      <div className="flex justify-center mt-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">

        </div>

      </div>
     )}

     {error && (
      <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 font-medium">
        {error}
      </div>
     )}
     {response && <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 font-medium">
            {response}
          </div>}
  </div>
  )
}
