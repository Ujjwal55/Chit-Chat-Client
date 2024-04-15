import Link from "next/link";
import React, { memo } from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface IChatItem {
  name: string;
  chatId: string;
  groupChat?: boolean;
  sameSender?: boolean;
  isOnline?: boolean;
  newMessages?: number;
  index?: number;
  profileImageURL?: string;
  handleDeleteChat?: () => void;
}

const ChatItem = ({
  name,
  chatId,
  groupChat = false,
  sameSender = false,
  isOnline,
  newMessages = 5,
  index = 0,
  profileImageURL = "",
  handleDeleteChat,
}: IChatItem) => {
  return (
    <Link href={`/chat/${chatId}`} className="">
      <div className="flex p-3 gap-2 rounded-[20px] items-center">
        <div>
          {profileImageURL ? (
            <Image
              src={profileImageURL}
              alt="user-img"
              height={40}
              width={40}
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-slate-400 flex justify-center items-center">
                <RxAvatar size={40}/>
            </div>
          )}
        </div>
        <div>{name}</div>
      </div>
    </Link>
  );
};

export default memo(ChatItem);
