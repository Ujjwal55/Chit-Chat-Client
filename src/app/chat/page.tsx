"use client"
import NavBar from '@/components/NavBar'
import ChatList from '@/components/chat-list/ChatList'
import ChatComponent from '@/components/chat/ChatComponent'
import { useGetUserProfile } from '@/services/queries'
import React, { useEffect } from 'react'
import {SocketProvider} from '@/socket/Socket'
import { useRouter } from 'next/navigation'
// import { useAuthStore } from '@/redux/store'
import SubHeader from '@/components/sub-header/SubHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile } from '@/redux/slices/authSlice'
import ChatMenu from '@/components/chat/chat-menu/ChatMenu'

export default function Chat () {
    const {data, error, isSuccess} = useGetUserProfile();
    const dispatch = useDispatch();
    if(isSuccess) {
      dispatch(setUserProfile(data?.user))
    }
    const router = useRouter();

   
  return (
    <SocketProvider>
    <div className='h-screen'>
      <SubHeader/>
      <ChatMenu/>
    </div>
    </SocketProvider>
  )
}