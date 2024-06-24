import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { formatTime, getFileFormat } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { MdAttachment } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { useGetChatMessages } from '@/services/queries';
import { useAddChatAttachement, useAddChatMessages } from '@/services/mutation';
import Avatar from '../Avatar';
import { SocketContext } from '@/socket/Socket';
import { NEW_MESSAGE, START_TYPING, STOP_TYPING } from '@/lib/event';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import { useSocketEvents } from '@/hooks/hook';
import { CiMenuKebab } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { IChatMessage, IMessage } from '@/lib/types/types';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

const MessageComponent = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // for pagination in messages
  const {isLoading, error, data: initialMessages, refetch} = useGetChatMessages(selectedChat?._id || "");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeOut = useRef<ReturnType<typeof setTimeout> | null>(null); 
  const addChatMutation = useAddChatMessages();
  const addChatAttachementMutation = useAddChatAttachement();
  const [attachments, setAttachments] = useState<File[]>([]); // state for storing attachements
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  let members: Array<string> = useMemo<Array<string>>(() => selectedChat?.members?.map((member) => member._id) || []
  , [selectedChat])
  const emojiRef = useRef<any>(null);

  // logic for handling messages


  useEffect(() => {
    // if (initialMessages && initialmessages?.length > 0) {
    //   console.log("initalMesssss", initialMessages);
    //   setMessages((prevMessages) => [...initialMessages, ...prevMessages]);
    //   if (initialmessages?.length < 20) {
    //     setHasMore(false);
    //   }
    // } else {
    //   setHasMore(false);
    // }
    if(initialMessages) {
      setMessages(initialMessages);
      // setMessages((prevMessages) => [...initialMessages, ...prevMessages]);
    }
  }, [initialMessages]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    refetch();
  };


  useEffect(() => {
    const scrollableDiv = document.getElementById('scrollableDiv');
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [messages]); 




  const handleSubmit = (chatId: string, senderId: string) => {
    if(attachments.length !== 0) {
      const formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("members", JSON.stringify(members));
      attachments.forEach((file: File, index: number) => {
        formData.append(`attachments`, file);
      });
      addChatAttachementMutation.mutate({senderId, formData});
      setAttachments([]);
      setMessage("");
    } else {
      socket.emit(NEW_MESSAGE, {
        chatId,
        members,
        message
      })
      refetch();
      setMessage("");
    }
  }

  const newMessageHandler = useCallback((data: IChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, data?.message]);
  }, [selectedChat]);

  const startTypingListener = useCallback((data: {chatId: string}) => {
    if(data.chatId !== selectedChat?._id) return;
    setUserTyping(true);
  }, [selectedChat]);

  const stopTypingListener = useCallback((data: {chatId: string}) => {
    if(data.chatId !== selectedChat?._id) return;
    setUserTyping(false);
  }, [selectedChat]);


  const eventHandler = {[NEW_MESSAGE]: newMessageHandler, [START_TYPING]: startTypingListener, [STOP_TYPING]: stopTypingListener}

  useSocketEvents(socket, eventHandler);

  // for attachements

  const renderAttachments = (attachments: Array<string>) => {
    return attachments?.map((attachment, index: number) => {
      const fileType = getFileFormat(attachment);
      if (fileType === 'image') {
        return (
          <a href={attachment} download target='_blank' key={attachment}>
            <Image
              src={attachment}
              alt="attachment"
              height={200}
              width={200}
              className="max-w-[200px] h-auto mb-2 cursor-pointer"
            />
        </a>
        );
      } else if (fileType === 'video') {
        return (
          <div key={index}>
            <video controls className="max-w-[200px] h-auto mb-2">
              <source src={attachment} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a
              href={attachment}
              download
              className="text-blue-500 hover:text-blue-700"
            >
              Download Video
            </a>
          </div>
        );
      } else if (fileType === 'audio') {
        return (
          <audio
            src={attachment}
            controls
            preload="none"
            className="max-w-[200px] h-auto mb-2"
            key={index}
          />
        );
      } else {
        return (
          <a
            href={attachment}
            download
            className="text-blue-500 hover:text-blue-700"
            key={attachment}
          >
            {attachment}
          </a>
        );
      }
    });
  };

  const handleAttachementButtonClick = () => {
    document.getElementById("attachement")?.click();
  }

  const handleAttachement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setMessage(`${message} ${files?.item(0)?.name}`)
    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if(attachments.length !== 0) {
      setMessage("");
      setAttachments([]);
      return;
    }
    setMessage(value);
  
    const chatId = selectedChat?._id;
    if(!typing) {
      socket.emit(START_TYPING, {members, chatId});
      setTyping(true);
    }

    if(typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setTyping(false);
    }, 2000);

    if (value === "") {
      setAttachments([]);
    }
  };

  const handleEmojiSelect = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage((prev) => prev + emojiData.emoji);
    const chatId = selectedChat?._id;
    if(!typing) {
      socket.emit(START_TYPING, {members, chatId});
      setTyping(true);
    }

    if(typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setTyping(false);
    }, 2000);
  }

  const handleClickOutside = (event: { target: any; }) => {
    if(emojiRef.current && !emojiRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && attachments.length !== 0) {
      setAttachments([]);
      setMessage("");
    } else if(e.key === "Enter") {
      handleSubmit(selectedChat?._id || "", user?._id || "");
    }
  };

  if(isLoading) return <div>Loading...</div>
  if(!selectedChat) return <div className="text-center text-gray-500 font-bold">
  Click on a conversation to get started! </div>
  if(messages?.length === 0) {
    return <div className="text-center text-gray-500 font-bold">
    Click on a conversation to get started!
  </div>
  }
  const chatName = selectedChat?.groupChat ? selectedChat.name : selectedChat?.members?.find((member: any) => member?._id !== user?._id)?.fullName;
  const chatAvatar = selectedChat.groupChat
  ? ""
  : selectedChat.members.find((member: any) => member._id !== user?._id)?.profileImageURL || "";
  return (
    <div className="flex flex-col h-full relative p-4">
       <div className="flex items-center justify-between border-b pb-4 mb-4">
  {selectedChat.groupChat ? (
      <div className="flex items-center space-x-4">
        <Avatar
          userId={selectedChat._id}
          name={chatName || ""}
          imageUrl={chatAvatar}
          width={50}
          height={50}
        />
        <div>
          <div className="font-semibold text-lg">{chatName}</div>
          <div className="text-gray-500 text-sm">{userTyping && "Someone is typing..."}</div>
        </div>
      </div>
    ) : (
      <div className="flex items-center space-x-4">
        <Avatar
          userId={selectedChat?._id}
          name={chatName || ""}
          imageUrl={chatAvatar}
          width={50}
          height={50}
        />
        <div>
          <div className="font-semibold text-lg">{chatName}</div>
          <div className="text-gray-500 text-sm"> {userTyping && "Typing..."} </div>
        </div>
      </div>
    )
  }
  <div>
    <CiMenuKebab className='cursor-pointer' onClick={() => {
      toast.info("Feature Coming Soon!");
    }}/>
  </div>
</div>


      <div className="flex-1 messages-container overflow-y-auto mb-4" id="scrollableDiv">
        <InfiniteScroll
          dataLength={messages?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={""}
          scrollableTarget="scrollableDiv"
          inverse={true}
        >
          {messages?.length === 0 ? (
            <div className='flex justify-center items-center h-full m-auto font-semibold'>
              Click on a coversation to get started!!
            </div>
          ) : (
            messages?.map((msg: IMessage) => (
              <div
                key={msg._id}
                className={`max-w-[70%] rounded-md p-2 flex flex-col mb-4 ${msg.sender._id === user?._id ? 'ml-auto bg-slate-100 text-black' : 'bg-gray-200 text-black'
                  }`}
              >
                <div className="font-semibold text-sm">
                  {msg.sender.fullName}
                </div>
                <div className="whitespace-normal break-words">{msg.content}</div>
                {msg.attachments && renderAttachments(msg.attachments)}
                
                <div className="text-xs text-gray-400 self-end">
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            ))
          )}
        </InfiniteScroll>
      </div>
    <div className="flex gap-2 items-center">
      <MdAttachment size={30} color="black" onClick={handleAttachementButtonClick} className="cursor-pointer hover:bg-slate-600 rounded-full" />
      <div ref={emojiRef} className='relative'>
      <BsEmojiSmile size={20} className='cursor-pointer' onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
      {showEmojiPicker && (
      <div className='absolute bottom-full mb-2 z-50'>
        <EmojiPicker onEmojiClick={handleEmojiSelect}/>
      </div>
      )}
      </div>
      <input type="file" className='hidden' id='attachement' multiple onChange={handleAttachement}/>
      <input
        type="text"
        className="flex-1 outline-none p-2 rounded-md border border-gray-300"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <IoMdSend size={30} color="black" onClick={() => handleSubmit(selectedChat?._id || "", user?._id || "")} className="cursor-pointer hover:bg-blue-600 rounded-full" />
    </div>
  </div>
  );
};

export default MessageComponent;
