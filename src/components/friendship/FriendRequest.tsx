import { useSendFriendRequest } from '@/services/mutation';
import React, { useState } from 'react'
import { IoIosCheckmark, IoMdPersonAdd } from 'react-icons/io'

const FriendRequest = ({friendId}: string) => {
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const sendFriendRequestMutation = useSendFriendRequest();
    const handleFriendRequestToggle = () => {
        console.log("fffffffff", friendId);
        sendFriendRequestMutation.mutate(friendId);
    };

  return (
    <div>
        {!friendRequestSent ? (
            <IoMdPersonAdd size={20} className='cursor-pointer relative text-blue-800' onClick={handleFriendRequestToggle}/>
        ): (
            <IoIosCheckmark size={25} className='cursor-pointer relative text-blue-800' onClick={handleFriendRequestToggle}/>
        )}
    </div>
  )
}

export default FriendRequest