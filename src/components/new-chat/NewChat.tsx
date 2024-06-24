import { IChat, IUser } from "@/lib/types/types";
import { getsearchFriend } from "@/services/api";
import { useDebounce } from "@/services/helper";
import { useSearchFriend } from "@/services/queries";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTab } from "@/redux/slices/tabSlice";
import { setSelectedChat } from "@/redux/slices/chatSlice";


const NewChat = () => {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const dispatch = useDispatch();
  const { isLoading, error, data: fetchedSearchResults = [] } = useSearchFriend(debouncedSearchTerm);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search friends..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="mt-4">
        {fetchedSearchResults?.map((friend: IUser & {chat: {details: IChat ; exists: boolean }}) => (
          <div key={friend._id} className="flex items-center justify-between p-2 border-b border-gray-300 text-white">
             <div className="flex items-center">
              <Avatar
                userId={friend._id}
                name={friend.fullName}
                imageUrl={friend.profileImageURL || ""}
                width={40}
                height={40}
              />
              <span className="ml-2">{friend.fullName}</span>
            </div>
            {friend.chat.exists ? (
              <button onClick={() => {
                console.log("cc", friend.chat.details);
                dispatch((setSelectedChat(friend.chat.details)))
                dispatch((toggleTab(1)));
              }} className="px-4 py-2 bg-green-500 text-white rounded">Go To Chat</button>
            ): (
              <button onClick={() => {}} className="px-4 py-2 bg-green-500 text-white rounded">Add To Chat</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
