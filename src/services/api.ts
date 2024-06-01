import axios from "axios";
import { getMeACookie } from "./helper";
import { IAxiosErrorResponse, ILoginData } from "@/lib/types/types";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000/api/v1";


let authToken = getMeACookie("chat-auth") || "";

interface LoginResponse { 
  userName: string,
  userId: string,
  authToken: string,
  message: string
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
  });

export const getUserProfile = async () => {
    try {
      return (await axiosInstance.get("/user/profile")).data;
    } catch (error: any) {
      throw new Error("Error: " + error.message);
    }
}


export const loginUser = async (userName: string, password: string): Promise<ILoginData>  => {
  try {
    const response = await axiosInstance.post<ILoginData>('/user/login', { userName, password });
    return response.data;
  } catch (error: IAxiosErrorResponse | unknown) {
    throw error;
  }
}

export const registerUser = async (fullName: string, userName: string, email: string, password: string) => {
  return (await axiosInstance.post("/user/register", {fullName, userName, email, password})).data
}

export const logOutUser = async (userId: string) => {
  console.log("userIddddd", userId);
  try {
    return (await axiosInstance.post(`/user/logout/${userId}`)).data
  } catch (error: IAxiosErrorResponse | unknown) {
    throw error;
  }
}


export const getUserChats = async () => {
  try {
    return (await axiosInstance.get("/chat/chats"))?.data;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}

export const getSearchUser = async (searchTerm: string) => {
  try {
    return (await axiosInstance.get(`user/search-user/${searchTerm}`))?.data;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}

export const sendFriendRequest = async (friendId: string) => {
  try {
    return (await axiosInstance.post(`friend/send-request`, {
      friendId
    }))?.data;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}

export const getNotificiations = async () => {
  try {
    return (await axiosInstance.get(`user/notifications`))?.data;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}

export const respondFriendRequest = async (friendshipId: string, response: string) => {
  try {
    return (await axiosInstance.post(`friend/respond-request`, {
      friendshipId, response
    }))?.data;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}

export const getChatDetails = async (chatId) => {
  console.log("inside chatttttttt", chatId);
  try {
    return (await axiosInstance.get(`chat/${chatId}`))?.data;
  } catch (error: any) {
    throw new Error("Error: " + error.message);
  }
}