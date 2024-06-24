"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import { useRegisterUser } from "@/services/mutation";
import { IoClose } from "react-icons/io5";

const Register = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicUpload, setProfilePicUpload] = useState("");
  const registerUserMutation = useRegisterUser();

  const handleUploadButtonClick = () => {
      document.getElementById('profileImageURL')?.click();
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    console.log("eventttttt", file);
    setProfilePicUpload(file);
  };

  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setProfilePicUpload("")
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    registerUserMutation.mutate({ fullName, userName, email, password, profilePicUpload });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-teal-400 to-cyan-500">
    <div className="flex flex-col justify-center items-center bg-white gap-8 p-10 rounded-lg shadow-lg">
      <div className="text-blue-900 font-bold text-3xl">Register</div>
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
          type="text"
          placeholder="Full Name"
          className="w-full p-4 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-400 transition-colors"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-400 transition-colors"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 bg-transparent border-2 border-solid border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-400 transition-colors"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex flex-col gap-1'>
          <div onClick={handleUploadButtonClick} className='h-14 text-blue-900 font-semibold bg-slate-100 flex justify-center items-center border rounded hover:bg-slate-200 cursor-pointer' >
              <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          profilePicUpload?.name ? profilePicUpload?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        profilePicUpload?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
            </div>
                <input
                  type='file'
                  id='profileImageURL'
                  name='profileImageURL'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>


        <button
          type="button"
          className="w-full h-14 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
      <Link href="/login" className="text-blue-900 font-bold hover:underline">
        Already have an account? Login
      </Link>
    </div>
  </div>
  );
};

export default Register;
