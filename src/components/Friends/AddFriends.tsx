import { IUser } from "@/lib/types/types";
import { useDebounce } from "@/services/helper";
import { useRespondFriendRequest, useSendFriendRequest } from "@/services/mutation";
import { useGetFriendRequests, useSearchUser } from "@/services/queries";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { LuUserCheck2 } from "react-icons/lu";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { REFETCH_CHATS } from "@/lib/event";
import { useQueryClient } from "@tanstack/react-query";
import { SocketContext } from "@/socket/Socket";
import { useSocketEvents } from "@/hooks/hook";

const FriendsList = () => {
  const queryClient = useQueryClient();
  const {notificationCount} = useSelector((state: RootState) => state.notification);
  const [selectedTab, setSelectedTab] = useState(notificationCount > 0 ? 1 : 0);
  const [friendsName, setFriendsName] = useState("");
  const [query, setQuery] = useState("");
  const { data: searchResult, isLoading } = useSearchUser(query);
  const sendFriendRequestMutation = useSendFriendRequest();
  const { data: friendRequests } = useGetFriendRequests();
  const responseFriendMutation = useRespondFriendRequest();
  const socket = useContext(SocketContext);

  const debouncedInputValue = useDebounce(friendsName, 500);


  useEffect(() => {
    setQuery(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleSearchFriend = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFriendsName(e.target.value);
  };

  const handleSendFriendRequest = (e: string) => {
    sendFriendRequestMutation.mutate(e);
  };

  const handleRefetchChats = () => {
    queryClient.invalidateQueries({queryKey: ["chat"]})
  }
  const handleRespondFriendRequest = (friendshipId: string, response: string) => {
    if(response === "accept") {
      handleRefetchChats();
    }
    responseFriendMutation.mutate({ friendshipId, response });
  };


  const handleEvents = {[REFETCH_CHATS]: handleRefetchChats}

  useSocketEvents(socket, handleEvents);

  return (
    <div className="flex flex-col items-center w-full text-white p-4 h-full">
      <div className="text-2xl font-semibold mb-4">Add/Remove Friends</div>
      <div className="border-b-2 border-gray-700 w-full mb-4"></div>
      <div className="flex w-full mb-4">
        <div
          onClick={() => setSelectedTab(0)}
          className={`w-1/2 text-center py-2 cursor-pointer ${selectedTab === 0 ? "bg-gray-700" : "hover:bg-gray-600"}`}
        >
          Add Friends
        </div>
        <div
          onClick={() => setSelectedTab(1)}
          className={`w-1/2 text-center py-2 cursor-pointer ${selectedTab === 1 ? "bg-gray-700" : "hover:bg-gray-600"}`}
        >
          Friend Requests
        </div>
      </div>
      <div className="border-b-2 border-gray-700 w-full mb-4"></div>
      {selectedTab === 0 ? (
        <div className="w-full">
          <input
            type="text"
            value={friendsName}
            onChange={handleSearchFriend}
            placeholder="Search for friends..."
            className="w-full p-2 mb-4 text-black rounded-lg outline-none"
          />
          <div className="overflow-y-auto h-[calc(100vh-200px)] p-2">
            {searchResult?.length > 0 ? (
              searchResult.map((item: IUser) => (
                <div key={item._id} className="flex items-center justify-between py-2 border-b border-gray-700 mb-2">
                  <div className="flex items-center">
                    {item?.profileImageURL ? (
                      <img className="w-10 h-10 rounded-full" src={item.profileImageURL} alt={item.fullName} />
                    ) : (
                      <RxAvatar className="w-10 h-10 text-gray-400" />
                    )}
                    <span className="ml-4 text-gray-300">{item.fullName}</span>
                  </div>
                  <div>
                    {item?.friendShipStatus === "pending" ? (
                      <button
                        className="text-cyan-500 hover:text-cyan-700"
                        onClick={() => {
                          toast.info("Friend Request Already Sent!");
                        }}
                      >
                        <LuUserCheck2 className="w-6 h-6" />
                      </button>
                    ) : item?.friendShipStatus === "accepted" ? (
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => {
                          toast.info("Already a friend!");
                        }}
                      >
                        <AiOutlineCheck className="w-6 h-6" />
                      </button>
                    ) : (
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleSendFriendRequest(item?._id)}
                      >
                        <IoMdPersonAdd className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No results found</div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full overflow-y-auto h-[calc(100vh-150px)] p-2">
          {friendRequests?.map((friendRequest: any) => (
            <div key={friendRequest._id} className="flex items-center justify-between py-2 border-b border-gray-700 mb-2">
              <div className="flex items-center">
                {friendRequest?.from?.profileImgUrl ? (
                  <img className="w-10 h-10 rounded-full" src={friendRequest?.from.profileImgUrl} alt={friendRequest?.from.fullName} />
                ) : (
                  <RxAvatar className="w-10 h-10 text-gray-400" />
                )}
                <span className="ml-4 text-gray-300">{friendRequest?.from.fullName}</span>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleRespondFriendRequest(friendRequest?._id, "accept")}
                >
                  <AiOutlineCheck className="w-6 h-6" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRespondFriendRequest(friendRequest?._id, "reject")}
                >
                  <AiOutlineClose className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
