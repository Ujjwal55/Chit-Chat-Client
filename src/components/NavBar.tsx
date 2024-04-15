"use client"
import React, { lazy, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { IoIosAdd, IoIosLocate, IoIosLogOut, IoIosNotifications } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import SheetComponent from './SheetComponent';
import UserProfile from './user-profile/UserProfile'
import { MdCancel } from 'react-icons/md'
import DropdownComponent from './DropDownComponent'
import NewChat from './new-chat/NewChat'
import NewGroup from './new-group/NewGroup'
import FriendShip from './friendship/FriendShip'
import { toast } from './ui/use-toast'
import useAuthStore from '@/store/store'
import { useLogOutUser } from '@/services/mutation'
import Notification from './notification/Notification'


const NavBar = () => {
  const {user} = useAuthStore((state) => state);
  const logOutUserMutation = useLogOutUser();
  const [search, setSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFriendShipModal, setShowFriendshipModal] = useState(false);
  const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

  const handleDropdownClick = (e: { key: string }) => {
    setIsOptionDropdownOpen(false);
    if(e.key === "1") {
      setShowNewChatModal(true);
    } else if(e.key === "2") {
      setShowNewGroupModal(true);
    } else {
      setShowFriendshipModal(true);
    }
  }


  return (
    <>
    <div className='h-14 bg-slate-600 flex items-center px-8 justify-between'>
      <div className='w-[29%] flex justify-between'>
        {!search && (
          <>
          <div className='text-white text-xl'>Chit Chat</div>
          <CiSearch size={25} color='white' className='cursor-pointer' onClick={() => setSearch(!search)}/>
          </>
        )}
        {search && (
          <div className='flex items-center gap-2'>
            <input type="text" placeholder='Search...' className='bg-slate-700 text-white p-2 rounded-md w-[90%] outline-none px-4'/>
            <MdCancel size={25} onClick={() => setSearch(false)} className='cursor-pointer'/>
          </div>
        )}
      </div>
        <div className='flex gap-5'>
          <SheetComponent title="Profile" desc={<UserProfile profileImageURL="" fullName="John Doe" userName="@johndoe" editable={true} onSave={() => {}}/>}>
            <RxAvatar size={25} color='white' className='cursor-pointer'/>
          </SheetComponent>
          <div className='relative'>
            <IoIosAdd size={25} color='white' className='cursor-pointer' onClick={() => setIsOptionDropdownOpen(!isOptionDropdownOpen)}/>
            {isOptionDropdownOpen && (
                <DropdownComponent
                    isOpen={isOptionDropdownOpen}
                    options={[
                        { label: 'New Chat', key: '1' },
                        { label: 'New Group', key: '2' },
                        { label: 'Add/Remove Friends', key: '3' },
                    ]}
                    dropdownStyles={{position: "absolute", right: "10px"}}
                    onClick={(e) => handleDropdownClick(e)}
                />
            )}
          </div>
          <IoIosNotifications  size={25} color='white' className='cursor-pointer' onClick={() => {
            setShowNotifications(true);
          }}/>
            <HiMiniUserGroup size={25} color='white' className='cursor-pointer' onClick={() => {
              toast({
                title: 'Coming soon!',
                description: "This feature is not available yet.",
              })
            }}/>
            <IoIosLogOut size={25} color='white' className='cursor-pointer' onClick={
              () => {
                logOutUserMutation.mutate(user?._id);
              }
            }/>
        </div>
    </div>
    {showNotifications && (
      <Notification isModalOpen={showNotifications} setIsModalOpen={setShowNotifications}/>
    )}
    {showNewChatModal && (
      <NewChat isModalOpen={showNewChatModal} setIsModalOpen={setShowNewChatModal}/>
    )}
    {showNewGroupModal && (
      <NewGroup isModalOpen={showNewGroupModal} setIsModalOpen={setShowNewGroupModal}/>
    )}
    {showFriendShipModal && (
      <FriendShip isModalOpen={showFriendShipModal} setIsModalOpen={setShowFriendshipModal}/>
    )}
    </>
  )
}

export default NavBar