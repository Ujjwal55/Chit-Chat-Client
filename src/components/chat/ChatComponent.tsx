"use client"
import React from 'react'
import { IoMdSend } from 'react-icons/io'
import { MdAttachment } from 'react-icons/md'
import MessageComponent from './MessageComponent'
import { messageData } from '@/mock/messageData'

const ChatComponent = () => {
    const user = {
        _id: "1",
        fullName: "John Doe"
    }
    console.log('hereeeeeeeeeeeeeee');
  return (
    <div className='w-full'>
        {
            messageData?.map((message) => (
                <MessageComponent key={message._id} content={message.content} createdAt={message.createdAt} sender={message.sender} attachments={message?.attachements || []} user={user}/>
            ))
        }
        <div className='p-2 absolute bottom-0 flex w-[70%] gap-2 items-center'>
            <MdAttachment size={30} color='white' onClick={() => {}} className='cursor-pointer hover:bg-slate-600 rounded-full'/>
            <input type="text" className='w-[95%] outline-none p-2 rounded-md' placeholder='Type your Message'/>
            <IoMdSend size={30} color='white'/>
        </div>
    </div>
  )
}

export default ChatComponent