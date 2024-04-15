"use client"
import NavBar from '@/components/NavBar'
import ChatList from '@/components/chat-list/ChatList'
import ChatComponent from '@/components/chat/ChatComponent'
import { useGetUserProfile } from '@/services/queries'
import useAuthStore from '@/store/store'
import React, { useEffect } from 'react'
import {SocketProvider} from '@/socket/Socket'

export default function Chat () {
    const {data, error} = useGetUserProfile();
    const {setUser} = useAuthStore();
    useEffect(() => {
      if (data?.user) {
          setUser(data?.user);
      }
  }, [data, setUser]);

   
  return (
    <SocketProvider>
    <div className='h-screen'>
      <NavBar/>
      <div className='flex h-[calc(100%-56px)]'>
        <div className='flex-grow-0 w-1/3 p-2 border-2 border-[#dfe1e5] border-t-0 min-h-full'>
      <ChatList/>
        </div>
      <div className='hidden md:block bg-gradient-radial w-full max-w-[70%] p-2 min-h-full'>
        <ChatComponent/>
      </div>
      </div>
    </div>
    </SocketProvider>
  )
}