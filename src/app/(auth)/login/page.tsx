"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginUser } from "@/services/mutation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginUserMutation = useLoginUser();
  // const { user } = useAuthStore((store) => store);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!userName || !password) {
      return toast.error("Please enter the credentails");
    }
    if(password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    loginUserMutation.mutate({ userName, password });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-teal-400 to-cyan-500">
      <div className="flex flex-col justify-center items-center bg-white gap-8 p-10 rounded-lg shadow-lg">
        <div className="text-blue-900 font-bold text-3xl">Welcome Back</div>
        <div className="flex flex-col gap-6 w-full">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-400 transition-colors"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-400 transition-colors"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="w-full h-14 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <Link href="/register" className="text-blue-900 font-bold hover:underline">
          Don&apos;t have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
