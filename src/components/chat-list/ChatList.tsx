import React, { useContext, useEffect } from 'react'
import ChatItem from './ChatItem'
import { useGetChats } from '@/services/queries'
import { useErrors } from '@/hooks/hook';
import { SocketContext } from '@/socket/Socket';


interface IChat {
  _id: string;
  name: string;
  lastMessage?: string; // Adjust this according to the actual structure
  groupChat: boolean;
  members: string[]; // Adjust this according to the actual structure
}

const ChatList = () => {
  const {data: chats, isLoading, isError, error} = useGetChats();
  const socket = useContext(SocketContext);
  useErrors([{ isError, error: error ? { message: error.message } : { message: '' } }]);

  if (isLoading) return <div>Loading...</div>
  if(chats?.length === 0) return <div>No chats</div>
  return (
        chats?.map((chat: IChat) => {
            const { _id, name, lastMessage, groupChat, members} = chat;
            <ChatItem name={name} chatId={_id} groupChat/>
        })
  )
}

export default ChatList