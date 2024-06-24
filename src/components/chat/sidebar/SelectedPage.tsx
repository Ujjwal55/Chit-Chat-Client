import { IUser } from "@/lib/types/types";
import { RootState } from "@/redux/store";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendsList from "@/components/Friends/AddFriends";
import Settings from "../settings/Settings";
import ChatSection from "../chat-section/ChatSection";
import UserDetails from "@/components/user-details/UserDetails";
import NewChat from "@/components/new-chat/NewChat";
import Profile from "@/components/profile/Profile";


const SelectedPage = () => {
  const [search, setSearch] = useState("");
  const tabIndex = useSelector((state: RootState) => state.tab);

  useEffect(() => {
    if (tabIndex !== 4 || !search) {
      setSearch("");
    }
  }, [tabIndex, search]);

  const renderContent = () => {
    switch (tabIndex) {
      case 1:
        return <ChatSection />;
      case 2:
        return <NewChat/>;
      case 3:
        return (
          <FriendsList
          />
        );
      case 4:
        return <Settings />;
      case 5:
        return <UserDetails />;
      case 6:
        return <Profile/>
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="transition-all duration-300 ease-in-out h-full">
      <div className="tab-content h-full">{renderContent()}</div>
    </div>
  </Suspense>
  );
};

export default SelectedPage;
