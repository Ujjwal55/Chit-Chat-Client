import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetChats } from "@/services/queries";
import Avatar from "@/components/Avatar";
import { IChat, IMessageAlert } from "@/lib/types/types";
import { setSelectedChat } from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import { NEW_MESSAGE_ALERT } from "@/lib/event";
import { useSocketEvents } from "@/hooks/hook";
import { SocketContext } from "@/socket/Socket";
import { resetNewMessageAlert, setNewMessageAlert } from "@/redux/slices/notification";
import AddGroupModal from "../group/AddGroupModal";
import { RiGroupFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { useDebounce } from "@/services/helper";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const ChatSection = () => {
  const socket = useContext(SocketContext);
  const { isLoading, error, data: chats } = useGetChats();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState(chats);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  console.log("selectedChattttttt", selectedChat);
  const { newMessageAlert } = useSelector((state: RootState) => state.notification);
  const handleSelectChat = (chat: IChat) => {
    console.log("chattttt", chat);
    dispatch(setSelectedChat(chat));
  };

  useEffect(() => {
    setInputValue("");
    setFilteredChats(chats);
  }, [chats])


  useEffect(() => {
    localStorage.setItem("NEW_MESSAGE_ALERT", JSON.stringify(newMessageAlert));
  }, [newMessageAlert]);

  useEffect(() => {
    const newMessageAlertCount = newMessageAlert?.find((alert: {chatId: string ; count: number}) => alert.chatId === selectedChat?._id);
    if (newMessageAlertCount && newMessageAlertCount.count > 0) {
      dispatch(resetNewMessageAlert(selectedChat?._id));
    }
  }, [selectedChat]);

  useEffect(() => {
    if (chats) {
      const filtered = chats.filter((chat: IChat) => {
        const isGroupChat = chat.groupChat;
        const chatName = isGroupChat
          ? chat.name
          : chat.members.find((member: any) => member._id !== user?._id)?.fullName;
        
        return chatName?.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredChats(filtered);
    }
  }, [inputValue]);

  const newMessageAlertHandler = useCallback(
    (data: IMessageAlert) => {
      if (data.chatId === selectedChat?._id) return;
      dispatch(setNewMessageAlert(data));
    },
    [selectedChat, dispatch]
  );

  const eventHandlers = { [NEW_MESSAGE_ALERT]: newMessageAlertHandler };

  useSocketEvents(socket, eventHandlers);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToggleSearch = () => {
    setSearchOpen(!searchOpen);
    setInputValue("");
  };

  return (
    <div className="default dynamic-sidebar p-4 bg-gray-800 text-white h-full">
      <div className="chat-menu flex flex-wrap items-center justify-between w-full mb-4">
        {!searchOpen && (
          <div>
            <h1 className="text-2xl m-0">Chat</h1>
            <p className="text-gray-400 mb-0">Start New Conversation</p>
          </div>
        )}
        <div className={`flex gap-2 ${searchOpen && 'w-full'}`}>
          {searchOpen ? (
            <div className="input-group items-center flex text-black w-full justify-between overflow-hidden">
              <div>
                <BiSearch className="text-white" size={20} />
              </div>
              <input
                className="w-3/4 focus:outline-none py-4 px-2"
                id="searchInput"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="flex items-center p-2 cursor-pointer text-white">
                <RxCross1 className="icon" onClick={handleToggleSearch} />
              </div>
            </div>
          ) : (
            <div className="search-icon p-2 rounded-full flex justify-center items-center cursor-pointer">
              <BiSearch className="icon" onClick={handleToggleSearch} />
            </div>
          )}
          <div className="flex items-center justify-end">
            <RiGroupFill size={18} className="text-white cursor-pointer ml-4" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>
      <div className="chat-list-container h-[calc(100%-56px)] overflow-y-auto">
        <div>
          {filteredChats?.map((chat: any) => {
            const newMessageAlertCount = newMessageAlert?.find((alert: IMessageAlert) => alert.chatId === chat._id);

            const isGroupChat = chat.groupChat;
            const chatName = isGroupChat ? chat.name : chat.members.find((member: any) => member._id !== user?._id)?.fullName;
            const chatAvatar = isGroupChat
              ? ""
              : chat.members.find((member: any) => member._id !== user?._id)?.profileImageURL || "";

            return (
              <div
                key={chat._id}
                className={`relative flex items-center p-2 border-b border-gray-700 cursor-pointer ${
                  selectedChat?._id === chat._id ? "bg-gray-700" : "hover:bg-gray-600"
                }`}
                onClick={() => handleSelectChat(chat)}
              >
                <Avatar
                  userId={chat._id}
                  name={chatName}
                  imageUrl={chatAvatar}
                  width={40}
                  height={40}
                />
                <div className="ml-2">
                  <div className="font-semibold">{chatName}</div>
                  <div className="text-gray-400 text-sm">Last message preview...</div>
                </div>
                {newMessageAlertCount && newMessageAlertCount.count > 0 && (
                  <div className="absolute right-2 top-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {newMessageAlertCount.count}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <AddGroupModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default ChatSection;
