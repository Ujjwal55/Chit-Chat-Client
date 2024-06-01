import React, { useState } from "react";
import { CgProfile, CgMenu, CgClose } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineStar } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";
import { BsChatSquareDots } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useLogOutUser } from "@/services/mutation";
import { IUser } from "@/lib/types/types";
import { RootState } from "@/redux/store";

const SubHeader = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const dispatch = useDispatch();
  const logOutUserMutation = useLogOutUser();
  //   const tabIndex = useSelector((state) => state.tabReducer);

  const activeTab = (index) => {
    // dispatch(toggleTab(index));
  };

  const sideIconsList = [
    { id: 1, icon: CgProfile, title: "Profile" },
    { id: 2, icon: AiOutlineStar, title: "Favourite" },
    { id: 3, icon: BsChatSquareDots, title: "Chats" },
    { id: 4, icon: RiContactsLine, title: "Contacts" },
    { id: 5, icon: AiOutlineSetting, title: "Setting" },
  ];

  const handleLogout = () => {
    logOutUserMutation.mutate(user?._id)
  };

  return (
    <div className={`fixed  transform ${menuIcon ? "translate-x-0" : ""} transition-transform duration-300 ease-in-out bg-gray-800 shadow-lg z-50 w-64 md:w-20`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 md:justify-center">
          {/* <NavLink to="/" className="logo"> */}
            <img src="images/logo2.png" alt="logo" className="h-10" />
          {/* </NavLink> */}
          <button onClick={() => setMenuIcon(!menuIcon)} className="md:hidden text-white">
            {menuIcon ? <CgClose className="w-6 h-6" /> : <CgMenu className="w-6 h-6" />}
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-4 mt-10">
          {sideIconsList.map((item, index) => (
            <li key={item.id} className={`w-full ${tabIndex === index + 1 ? "bg-blue-600" : "hover:bg-blue-700"} rounded-lg`}>
              <button
                className="flex items-center justify-center w-full h-12 text-white"
                onClick={() => setTabIndex(index + 1)}
              >
                <item.icon className="w-6 h-6" />
              </button>
            </li>
          ))}
          <li className="w-full hover:bg-blue-700 rounded-lg">
            <button className="flex items-center justify-center w-full h-12 text-white">
              {/* <Toggler /> */}
            </button>
          </li>
          <li className="w-full hover:bg-blue-700 rounded-lg">
            <button className="flex items-center justify-center w-full h-12 text-white" onClick={handleLogout}>
              <IoLogOutOutline className="w-6 h-6" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubHeader;
