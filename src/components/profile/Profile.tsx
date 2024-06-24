import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Avatar from "@/components/Avatar";
import { CiEdit } from "react-icons/ci";
import { useUpdateUser } from "@/services/mutation";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const updateUserProfileMutation = useUpdateUser();
  const [errorMsg, setErrorMsg] = useState({ email: "", oldPassword: "", password: "" });
  const [isEditing, setIsEditing] = useState({
    profileImage: false,
    fullName: false,
    email: false,
    oldPassword: false,
  });

  useEffect(() => {
    if (isEditing.email && email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMsg((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrorMsg((prev) => ({ ...prev, email: "" }));
      }
    }

    // Validate passwords
    if (isEditing.oldPassword) {
      if (oldPassword && oldPassword.length < 6) {
        setErrorMsg((prev) => ({ ...prev, oldPassword: "Password must be at least 6 characters long" }));
      } else {
        setErrorMsg((prev) => ({ ...prev, oldPassword: "" }));
      }

      if (password && oldPassword !== password) {
        setErrorMsg((prev) => ({ ...prev, password: "Passwords do not match" }));
      } else {
        setErrorMsg((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [email, password, password, isEditing.email, isEditing.oldPassword]);

  const handleSave = () => {
    updateUserProfileMutation.mutate({fullName, email, oldPassword, password})
    setIsEditing({
      profileImage: false,
      fullName: false,
      email: false,
      oldPassword: false,
    });
  };

  const handleFileInput = () => {
    document.getElementById("upload-avatar")?.click();
  }

  return (
    <div className="p-4 bg-gray-800 text-white h-full flex flex-col items-center">
      <h1 className="text-2xl mb-4">Profile & Settings</h1>
      <div className="relative mb-4">
        <Avatar userId={user._id} name={fullName} imageUrl={user?.profileImageURL || ""} width={100} height={100} />
        <CiEdit
          size={24}
          className="absolute bottom-0 right-0 bg-gray-700 rounded-full cursor-pointer p-1"
          onClick={handleFileInput}
        />
      </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            
            if (file) {
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
                if (validImageTypes.includes(file.type)) {
                  updateUserProfileMutation.mutate({ profilePicUpload: file });
                } else {
                    toast.error("Invalid file format!");
                    return;
                }
            }
          }}
          id='upload-avatar'
          className="mb-4 hidden"
        />
      <div className="w-full max-w-md">
        <div className="mb-4 relative">
          <label className="block text-gray-400 mb-1">Full Name</label>
          <div className="flex justify-between items-center">
            {isEditing.fullName ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            ) : (
              <span>{fullName}</span>
            )}
            <CiEdit
              size={24}
              className="ml-2 bg-gray-700 rounded-full cursor-pointer p-1"
              onClick={() => setIsEditing({ ...isEditing, fullName: true })}
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-400 mb-1">Email</label>
          <div className="flex justify-between items-center">
            {isEditing.email ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            ) : (
              <span>{email}</span>
            )}
            <CiEdit
              size={24}
              className="ml-2 bg-gray-700 rounded-full cursor-pointer p-1"
              onClick={() => setIsEditing({ ...isEditing, email: true })}
            />
          </div>
          {errorMsg.email && <div className="text-red-500 mt-1">{errorMsg.email}</div>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-400 mb-1">Password</label>
          <div className="flex justify-between items-center">
            {isEditing.oldPassword ? (
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            ) : (
              <span>****</span>
            )}
            <CiEdit
              size={24}
              className="ml-2 bg-gray-700 rounded-full cursor-pointer p-1"
              onClick={() => setIsEditing({ ...isEditing, oldPassword: true })}
            />
          </div>
          {errorMsg.password && <div className="text-red-500 mt-1">{errorMsg.password}</div>}
        </div>
        {isEditing.oldPassword && (
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[92%] p-2 rounded bg-gray-700 text-white outline-none ${
                !isEditing.oldPassword && "cursor-not-allowed"
              }`}
              readOnly={!isEditing.oldPassword}
            />
            {errorMsg.password && <div className="text-red-500 mt-1">{errorMsg.password}</div>}
          </div>
        )}
        {(isEditing.fullName || isEditing.email || isEditing.oldPassword || isEditing.profileImage) && (
          <button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mb-4">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
