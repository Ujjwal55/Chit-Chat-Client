"use client";
import { useGetUserProfile } from "@/services/queries";
import React, { useEffect } from "react";
import { SocketProvider } from "@/socket/Socket";
import { useRouter } from "next/navigation";
import SubHeader from "@/components/sub-header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/redux/slices/authSlice";
import SelectedPage from "@/components/chat/sidebar/SelectedPage";
import MessageComponent from "@/components/chat/MessageComponent";

export default function Chat() {
  const { data, error, isSuccess } = useGetUserProfile();
  const dispatch = useDispatch();
  if (isSuccess) {
    dispatch(setUserProfile(data?.user));
  }

  return (
    <SocketProvider>
      <div className="h-screen flex">
        <div className="w-[5%]">
          <SubHeader />
        </div>
        <div className="w-[95%] md:w-[40%] h-full bg-gray-800">
          <SelectedPage />
        </div>
        <div className="hidden md:block md:w-[55%] h-full">
          <MessageComponent/>
        </div>
      </div>
    </SocketProvider>
  );
}
