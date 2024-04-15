import axios from "axios";
import { getMeACookie } from "./helper";

const BASE_URL = "http://localhost:8000/api/v1";


let authToken = getMeACookie("chat-auth") || "";

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


export const loginUser = async (userName: string, password: string) => {
  return (await axiosInstance.post("/user/login", {userName, password})).data
}

export const registerUser = async (fullName: string, userName: string, email: string, password: string) => {
  return (await axiosInstance.post("/user/register", {fullName, userName, email, password})).data
}

export const logOutUser = async (userId: string) => {
  return (await axiosInstance.post(`/user/logout/${userId}`)).data
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
