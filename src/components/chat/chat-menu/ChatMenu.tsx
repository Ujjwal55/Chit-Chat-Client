import { IUser } from "@/lib/types/types";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChatList from "../chat-list/ChatList";


const ChatMenu = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const tabIndex = useSelector((state: RootState) => state.tab);
const user = useSelector((state: RootState) => state.auth.user) as IUser;
//   const UserLoading = useSelector(
//     (globalState) => globalState.chat.isUserLoading
//   );
  const [showResult, setShowResult] = useState(false);
//   const chat = useSelector((globalState) => globalState.chat.chats);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

//   useEffect(() => {
//     // setSearchResult(result);
//   }, [result]);

  const handleClick = () => {
    // if (!search) {
    //   toast.warning("Please Enter valid Email or Name", {
    //     autoClose: 1000,
    //   });
    //   return;
    // }
    // setShowResult(true);
    // dispatch(fetchUser(search));
  };

  const createNewChat = async (item) => {
    // const UserExist = chat.some((elem) => elem.users[1]._id === item._id);

    // if (UserExist) {
    //   toast.error("Contact already exists", {
    //     autoClose: 1000,
    //   });
    //   return;
    // } else {
    //   toast.success("Contact successfully added", {
    //     autoClose: 1000,
    //   });
    // }

    // await dispatch(createChat(item._id));
    // await dispatch(fetchChats());
    // await dispatch(toggleTab(3));
  };

  useEffect(() => {
    if (tabIndex !== 4 || !search) {
      setSearch("");
    //   dispatch(fetchUserClear());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, search]);

  return (
    <div className="relative max-w-xs h-full min-w-xs z-9 overflow-hidden bg-gray-800 border-r border-gray-300 transition-all duration-300 ease-in-out md:w-1/4 md:min-w-1/4">
      <div className="tab-content">
        <div className={tabIndex === 1 ? "tab-pane active" : "tab-pane"}>
          {/* <Profile
            pic={user.pic}
            name={user.name}
            email={user.email}
            about={user.about}
            contact={user.contact}
          /> */}
        </div>
        <div className={tabIndex === 2 ? "tab-pane active" : "tab-pane"}>
          {/* <Favourite /> */}
        </div>
        <div
          className={
            tabIndex === 3 || tabIndex === 0 ? "tab-pane active" : "tab-pane"
          }
        >
          <ChatList />
        </div>
        <div className={tabIndex === 4 ? "tab-pane active" : "tab-pane"}>
          {/* <Contacts
            search={search}
            handleChange={handleChange}
            handleClick={handleClick}
            searchResult={searchResult}
            createNewChat={createNewChat}
            UserLoading={UserLoading}
            showResult={showResult}
          /> */}
        </div>
        <div className={tabIndex === 5 ? "tab-pane active" : "tab-pane"}>
          {/* <Setting /> */}
          <div>s</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
