import React, { useCallback, useContext, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { RiChatNewFill } from "react-icons/ri";
import { BsChatSquareDots } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useLogOutUser } from "@/services/mutation";
import { IUser } from "@/lib/types/types";
import { RootState } from "@/redux/store";
import { toggleTab } from "@/redux/slices/tabSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineGroupAdd } from "react-icons/md";
import Avatar from "../Avatar";
import { useSocketEvents } from "@/hooks/hook";
import { SocketContext } from "@/socket/Socket";
import { NEW_REQUEST } from "@/lib/event";
import { incrementNotification, reset } from "@/redux/slices/notification";

const SubHeader = () => {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [menuIcon, setMenuIcon] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const activeTab = useSelector((state: RootState) => state.tab);
  const {notificationCount} = useSelector((state: RootState) => state.notification)
  const dispatch = useDispatch();
  const logOutUserMutation = useLogOutUser();

  const handleShowFriendRequest = useCallback(() => {
    dispatch(incrementNotification())
  }, [])

  const eventHandler = { [NEW_REQUEST] : handleShowFriendRequest }
  //   const tabIndex = useSelector((state) => state.tabReducer);

  useSocketEvents(socket, eventHandler);

  const setActiveTab = (index: number) => {
    dispatch(toggleTab(index));
  };

  const sideIconsList = [
    { id: 1, icon: BsChatSquareDots, title: "Chats" },
    { id: 2, icon: RiChatNewFill, title: "New Chat" },
    { id: 3, icon:  MdOutlineGroupAdd, title: "Manage Friends"},
    { id: 4, icon: AiOutlineSetting, title: "Setting" },
    { id: 5, icon: IoLogOutOutline, title: "Logout"}
  ];

  const handleLogout = () => {
    logOutUserMutation.mutate(user?._id)
  };
  
  const handleIconClick = (index: number) => {
    setActiveTab(index + 1);
    if(index === 4 && notificationCount > 0) {
      dispatch(reset());
    }
  }

  console.log('nottttttt', notificationCount);

  return (
    <div className={`fixed w-[5%] h-full transform ${menuIcon ? "translate-x-0" : ""} transition-transform duration-300 ease-in-out shadow-lg`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center h-10 mt-5">
            <Image src={"/images/logo2.png"} height={35} width={35} alt="logo" className="cursor-pointer" onClick={() => {
              router.push("/");
            }}/>
        </div>
        <ul className="flex flex-col items-center space-y-4 mt-10">
          {sideIconsList.map((item, index) => (
            <li key={item.id} className={`w-full ${activeTab === index + 1 ? "bg-blue-600" : "hover:bg-blue-700"} rounded-lg`}>
              <button
                className="flex relative items-center justify-center w-full h-12"
                onClick={() => handleIconClick(index)}
                title={item.title}
              >
                <item.icon className="w-5 h-5" />
                {item.id === 4 && notificationCount > 0 && (
                  <span className="notification-badge">{notificationCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
                className="flex  items-center justify-center w-full h-12 mt-auto"
                onClick={() => setActiveTab(6)}
                title={user?.fullName}
              >
              <Avatar userId={user?._id} name={user?.fullName} imageUrl={user?.profileImageURL || ""} width={50} height={50}/>
        </button>
        </div>
    </div>
  );
};

export default SubHeader;
