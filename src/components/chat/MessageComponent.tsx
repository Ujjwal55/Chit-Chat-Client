import { formatTime, generateRandomColor, getFileFormat } from '@/lib/utils';
import React from 'react'
import Image from 'next/image';

interface IMessageComponent {
    content: any;
    createdAt: string;
    sender: any;
    user: any;
    attachments: any;
}
const MessageComponent = ({content, createdAt, sender, user, attachments}: IMessageComponent) => {
    const randomColor = {
        color: generateRandomColor()
    }
    const renderAttachments = () => {
        return attachments?.map((attachment: any, index: number) => {
            const fileType = getFileFormat(attachment);
            console.log("");
            if(fileType === "image") {
                return (
                <>
                <Image src={attachment} alt="attachment" height={50} width={50} key={attachment} className="max-w-[200px] h-auto mb-2" />
                </> )
            } else if(fileType === "video") {
                return (
                <div key={index}>
                <video controls className="max-w-[200px] h-auto mb-2">
                    <source src={attachment} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <a href={attachment} download className="text-blue-500 hover:text-blue-700">Download Video</a>
            </div>
            )

            } else if(fileType === "audio") {
                <audio src={attachment} controls preload='none' className="max-w-[200px] h-auto mb-2"/>
            } else {
                return <a href={attachment} download className="text-blue-500 hover:text-blue-700" key={attachment}>{attachment}</a>
            }
        })
    }
  return (
    <div className={`bg-white max-w-[50%] rounded-md p-2 flex flex-col ${sender._id === user._id && "ml-auto"}`}>
        <div className='font-semibold text-sm' style={randomColor}>{sender.fullName}</div>
        <div className='whitespace-normal break-words'>{content}</div>
        {renderAttachments()}
        <div className='text-xs text-gray-400 self-end'>
            {formatTime(createdAt)}
        </div>
    </div>
  )
}

export default MessageComponent