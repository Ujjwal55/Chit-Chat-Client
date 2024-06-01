"use client"
import React, { useContext, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { MdAttachment } from 'react-icons/md'
import MessageComponent from './MessageComponent'
import { messageData } from '@/mock/messageData'
import { SocketContext } from '@/socket/Socket'
import { NEW_MESSAGE } from '@/lib/event'
import { useGetChatDetails } from '@/services/queries'
import { useSelectChat } from '@/redux/store'

const ChatComponent = () => {
    const user = {
        _id: "1",
        fullName: "John Doe"
    }
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const {selectedChat} = useSelectChat();
  const {data: chats, isLoading, isError, error} = useGetChatDetails(selectedChat || "");
  console.log("detailssssssssss", chats);
//   const members = chats?.
  const submitHandler = (e) => {
    if(!message.trim()) return;
    socket.emit(NEW_MESSAGE, {
        chatId,
        members,
        message
    })
    setMessage("");
  }
  return (
    <div className='w-full'>
        {
            messageData?.map((message) => (
                <MessageComponent key={message._id} content={message.content} createdAt={message.createdAt} sender={message.sender} attachments={message?.attachements || []} user={user}/>
            ))
        }
        <div className='p-2 absolute bottom-0 flex w-[70%] gap-2 items-center'>
            <MdAttachment size={30} color='white' onClick={() => {}} className='cursor-pointer hover:bg-slate-600 rounded-full'/>
            <input type="text" className='w-[95%] outline-none p-2 rounded-md' placeholder='Type your Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
            <IoMdSend size={30} color='white' onClick={submitHandler}/>
        </div>
    </div>
  )
}

export default ChatComponent