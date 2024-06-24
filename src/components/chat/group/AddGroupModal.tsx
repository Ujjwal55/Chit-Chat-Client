import React, { useState, ChangeEvent, useContext } from "react";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import Modal from "@/components/ui/Modal";
import { useSearchUser } from "@/services/queries";
import { useDebounce } from "@/services/helper";
import { RxAvatar } from "react-icons/rx";
import { useCreateNewGroup } from "@/services/mutation";
import { IUser } from "@/lib/types/types";
import { useSocketEvents } from "@/hooks/hook";
import { SocketContext } from "@/socket/Socket";
import { REFETCH_CHATS } from "@/lib/event";
import { useQueryClient } from "@tanstack/react-query";

interface IAddGroupModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddGroupModal = ({isOpen, setIsOpen}: IAddGroupModal) => {
  const queryClient = useQueryClient();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading1, setLoading1] = useState(false);
  const createGroupChatMutation = useCreateNewGroup();
  const socket = useContext(SocketContext);

  const debouncedSearch = useDebounce(search, 500);
  const { data: searchResult, isLoading } = useSearchUser(debouncedSearch);

  const closeModal = () => {
    setGroupChatName("");
    setSearch("");
    setSelectedUser([]);
    setIsOpen(false);
  };

  const addUserTogroup = (userToAdd: IUser) => {
    const userExist = selectedUser.some((item) => item._id === userToAdd._id);
    if (userExist) {
      toast.warn(`${userToAdd.fullName} already added`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setSelectedUser([...selectedUser, userToAdd]);
    }
  };

  const deleteSelectedUser = (deleteUser: IUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== deleteUser._id));
  };

  const handleCreateNewGroupChat = async () => {
    if (!groupChatName || selectedUser.length < 2) {
      toast.warn("Please provide Group Name and at least 2 users", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const groupInfo = {
      name: groupChatName,
      members: selectedUser.map((user) => user._id),
    };

    setLoading1(true);
    createGroupChatMutation.mutate(groupInfo, {
      onSuccess: () => {
        setLoading1(false);
        closeModal();
      },
      onError: () => {
        setLoading1(false);
      },
    });
  };

  const handleRefetchChats = () => {
    queryClient.invalidateQueries({queryKey: ["chat"]})
  }

  const handleEvents = {[REFETCH_CHATS]: handleRefetchChats}

  useSocketEvents(socket, handleEvents);

  return (
    <>

      <Modal isOpen={isOpen} onClose={closeModal} modalStyles={{ maxWidth: "600px", width: "100%" }}>
        <h3 className="text-lg text-center font-medium leading-6 text-gray-900">Create New Group</h3>

        <div className="mt-4">
          <div className="mb-6">
            <label
              htmlFor="group-name-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Group Name
            </label>
            <input
              type="text"
              id="group-name-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. My Group"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="search-user-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Search User
            </label>
            <input
              type="text"
              id="search-user-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Add User e.g. John, Jane"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />

            <div className="my-4 flex flex-wrap gap-2">
              {selectedUser.length > 0 && selectedUser.map((item) => (
                <div key={item._id} className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded px-2 py-1">
                  <span>{item.fullName}</span>
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-900"
                    onClick={() => deleteSelectedUser(item)}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="user-list my-4 overflow-y-auto max-h-40">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
              ) : (
                searchResult?.length > 0 ? (
                  searchResult.map((item: IUser) => (
                    <div key={item._id} className="flex items-center justify-between py-2 border-b border-gray-200">
                      <div className="flex items-center">
                        {item.profileImageURL ? (
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.profileImageURL}
                            alt={item.fullName}
                          />
                        ) : (
                          <RxAvatar className="w-10 h-10 rounded-full text-gray-400" />
                        )}
                        <span className="ml-4 text-gray-700">{item.fullName}</span>
                      </div>
                      <button
                        className="text-cyan-500 hover:text-cyan-700"
                        onClick={() => addUserTogroup(item)}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    {search ? "No Contact Found" : "Search for users"}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer flex justify-end mt-3">
          <button
            type="button"
            className="close-btn mr-4 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn bg-cyan-500 text-white rounded px-4 py-2 hover:bg-cyan-600"
            onClick={handleCreateNewGroupChat}
            disabled={loading1}
          >
            {loading1 ? "Creating..." : "Create Group"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddGroupModal;
