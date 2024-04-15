import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { userFriends } from '@/mock/friendData'
import { IoIosChatbubbles } from 'react-icons/io';

const NewChat = ({isModalOpen, setIsModalOpen}) => {
  const friends = userFriends;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
};

const filteredFriendsList = friends.filter(friend =>
    friend.fullName.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div>
        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalStyles={{width: "400px", height: "500px"}}>
            <div className='text-xl flex justify-center mb-4'>Friends</div>
            <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search friends..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
            {filteredFriendsList?.map((friend) => {
              return <div className='my-4'>
                <div className='flex gap-8 items-center justify-between'>
                  <div className='text-xl max-w-[80%] font-bold overflow-hidden text-ellipsis text-nowrap' title={friend.fullName}>
                {friend.fullName}
                  </div>
                <IoIosChatbubbles size={20} className='cursor-pointer relative'/>
                </div>
                <div className='text-sm text-gray-500 overflow-hidden text-ellipsis text-nowrap' title={friend.username}>
                {`@${friend.username}`}
                </div>
              </div>
            })}
        </Modal>
        )}
    </div>
  )
}

export default NewChat