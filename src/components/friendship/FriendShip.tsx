import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { IoMdPersonAdd } from 'react-icons/io';
import { userFriends } from '@/mock/friendData';
import { MdOutlineFactCheck } from 'react-icons/md';
import FriendRequest from './FriendRequest';
import { useSearchUser } from '@/services/queries';
import { useDebounce } from '@/services/helper';

const FriendShip = ({isModalOpen, setIsModalOpen}) => {
  const friends = userFriends;
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const { data: searchResult, isLoading, error } = useSearchUser(debouncedSearchTerm);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

  return (
    <div>
      {isModalOpen && (
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalStyles={{width: "400px", height: "500px", position: "relative"}}>
      <div className='text-xl flex justify-center mb-4'>Add Friends</div>
      <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                    />
                </div>
            {searchResult?.map((friend) => {
              return <div className='my-4'>
                <div className='flex gap-8 items-center justify-between'>
                  <div className='text-xl max-w-[80%] font-bold overflow-hidden text-ellipsis text-nowrap' title={friend.fullName}>
                {friend.fullName}
                  </div>
                  <FriendRequest friendId={friend._id}/>
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

export default FriendShip