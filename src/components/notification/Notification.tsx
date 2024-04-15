import React, { useState } from "react";
import Modal from "../ui/Modal";
import { IoMdPersonAdd } from "react-icons/io";
import { userFriends } from "@/mock/friendData";
import { MdOutlineFactCheck } from "react-icons/md";
import FriendRequest from "./FriendRequest";
import { useGetNotifications, useSearchUser } from "@/services/queries";
import { useDebounce } from "@/services/helper";
import { useErrors } from "@/hooks/hook";
import { useRespondFriendRequest } from "@/services/mutation";

const Notification = ({ isModalOpen, setIsModalOpen }) => {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useGetNotifications();
  useErrors([{ isError, error }]);
  const responseFriendRequestMutation = useRespondFriendRequest();

  if (isLoading) return <div>Loading...</div>;
  const handleAcceptFriendRequest = (friendshipId: string) => {
    responseFriendRequestMutation.mutate({friendshipId, response: "accept"});
    setIsModalOpen(false);
  }
  const handleRejectFriendRequest = (friendshipId: string) => {
    responseFriendRequestMutation.mutate({friendshipId, response: "reject"});
    setIsModalOpen(false);
  }
  return (
    <div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalStyles={{
            width: "500px",
            height: "500px",
            position: "relative",
          }}
        >
          <div className="text-xl flex justify-center mb-4">Notifications</div>
          <div className="mb-8">
            {notifications?.map((from) => {
              console.log("frrrrrr", from);
              return (
                <>
                  <div className="flex">
                    <div className="w-[60%]">
                    <div
                      className="text-xl max-w-[80%] font-bold overflow-hidden text-ellipsis text-nowrap"
                      title={from?.from?.fullName}
                    >
                      {from?.from?.fullName}
                    </div>
                  <div
                    className="text-sm text-gray-500 overflow-hidden text-ellipsis text-nowrap"
                    title={from.username}
                  >
                    {`@${from?.from?.userName}`}
                  </div>
                    </div>
                  <div className="flex gap-8">
                    <div className="cursor-pointer text-green-500 hover:bg-green-200 h-[25px] rounded-lg flex items-center px-4" onClick={() => handleAcceptFriendRequest(from?._id, from?.from?._id)}>Accept</div>
                    <div className="cursor-pointer text-red-700 hover:bg-red-100 h-[25px] rounded-lg flex items-center px-4" onClick={() => handleRejectFriendRequest(from?._id, from?.from?._id)}>Reject</div>
                  </div>
                  </div>
                </>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Notification;
