import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { userFriends } from '@/mock/friendData';

const NewGroup = ({isModalOpen, setIsModalOpen}) => {
  const friends = userFriends;
  const [selectedFriends, setSelectedFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [groupName, setGroupName] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFriendClick = (friendId) => {
        if (selectedFriends.includes(friendId)) {
            setSelectedFriends(selectedFriends.filter(id => id !== friendId));
        } else {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredFriendsList = friends.filter(friend =>
        friend.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFocus = () => {
      setIsFocused(true);
  };

  const handleBlur = () => {
      setIsFocused(false);
  };

    const handleGroupNameChange = (e) => {
      setGroupName(e.target.value);
  };
  return (
    <div>
      {isModalOpen && (
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalStyles={{width: "400px", height: "500px", position: "relative"}}>
        {selectedFriends.length === 0 ? (
          <h2 className="text-lg font-semibold mb-4 mt-4">Add Friends to Group</h2>
        ): (
          <input
          type="text"
          placeholder="Enter Name of Group"
          className={`outline-none my-4 px-2  ${isFocused && 'border-b-2 border-orange-200'} transition-all duration-300`}
          value={groupName}
          onChange={handleGroupNameChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
      />
        )}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search friends..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="overflow-y-auto max-h-64">
                    {filteredFriendsList.map(friend => (
                        <div key={friend._id} className={`flex items-center mb-2 cursor-pointer rounded-md p-2 ${selectedFriends.includes(friend._id) ? 'bg-blue-200' : ''}`} onClick={() => handleFriendClick(friend._id)}>
                            <span className='max-w-[80%] font-bold overflow-hidden text-ellipsis text-nowrap'>{friend.fullName}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex absolute bottom-2 right-2">
                <button onClick={() => setIsModalOpen(false)} className=" text-white bg-blue-400 px-4 py-2 rounded-md mr-2">Create Group</button>
                    <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2">Cancel</button>
                </div>
      </Modal>
      )}
    </div>
  )
}

export default NewGroup