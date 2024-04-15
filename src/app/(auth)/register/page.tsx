"use client"
import Link from "next/link";
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import { useRegisterUser } from "@/services/mutation";

const Register = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const registerUserMutation = useRegisterUser();

    const handleRegisterUser = async (e: { preventDefault: () => void; }) => {
        registerUserMutation.mutate({fullName, userName, email, password});
    }
    return (
        <div className="bg-black min-h-screen">
            <form className="p-5 flex min-h-screen items-center justify-center flex-col gap-2">
            <Avatar/>

            <input type="email" placeholder="Full Name" className="w-96 max-w-full p-5 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-white text-2xl font-bold" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type="text" placeholder="Username" className="w-96 max-w-full p-5 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-white text-2xl font-bold" required value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="email" placeholder="Email" className="w-96 max-w-full p-5 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-white text-2xl font-bold" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-96 max-w-full p-5 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-white text-2xl font-bold" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="button" className="w-96 max-w-full h-16 border-2 border-solid border-green-500 bg-green-500 rounded-lg cursor-pointer text-white text-base font-normal" onClick={handleRegisterUser}>Register</button>
            <Link href="/login" className="text-white">Login with an existing account</Link> 
            </form>
        </div>
    )
}

export default Register;