import Searchbar from "@/components/ui/SearchBar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatList = () => {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatList, setChatList] = useState([]);

//   const chat = useSelector((globalState) => globalState.chat.chats);
//   const loggedUser = useSelector((globalState) => globalState.user.userDetails);
//   const result = useSelector((globalState) => globalState.chat.selectedChat);

//   useEffect(() => {
//     setChatList(chat);
//   }, [chat]);

//   useEffect(() => {
//     if (selectedChat) {
//       dispatch(selectChatAction(selectedChat));
//       dispatch(getAllChats(selectedChat));
//     }
//   }, [selectedChat, dispatch]);

  return (
    <div className="default dynamic-sidebar p-4 bg-gray-800 text-white h-full">
      <div className="chat-menu flex flex-wrap items-center justify-between w-full mb-4">
        {!searchOpen && (
          <div>
            <h1 className="text-2xl m-0">Chat</h1>
            <p className="text-gray-400 mb-0">Start New Conversation</p>
          </div>
        )}
        <div
          className={
            searchOpen
              ? "flex justify-center items-center w-full"
              : "flex justify-center items-center"
          }
        >
        <Searchbar
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            setQuery={setQuery}
          /> 
          {/* <Group /> */}
        </div>
      </div>
      {/* <UserList
        query={query}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        chatList={chatList}
        chat={chat}
        loggedUser={loggedUser}
        result={result}
        setSelectedChat={setSelectedChat}
      /> */}
    </div>
  );
};

export default ChatList;
