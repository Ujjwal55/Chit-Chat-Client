import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChatAttachements, addChatMessages, createNewGroup, logOutUser, loginUser, registerUser, respondFriendRequest, sendFriendRequest, updateUserProfile } from "./api";
import { useErrors } from "@/hooks/hook";
import { toast } from "react-toastify";
import { IAxiosErrorResponse } from "@/lib/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login, logout } from "@/redux/slices/authSlice";
import { ILoginData } from "@/lib/types/types"




export function useLoginUser () {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation({
        mutationFn: ({userName, password}: {userName: string, password: string}) => loginUser(userName, password),
        onSuccess(data: ILoginData) {
          dispatch(login(data.user))
          toast.success("Login Success");
          window.location.href = "/chat";  
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}

export function useLogOutUser () {
    const dispatch = useDispatch<AppDispatch>();
    return useMutation({
        mutationFn: (userId: string) => logOutUser(userId),
        onSuccess(data, variables, context) {
            // dispatch(logout());
            toast.success("Logout Success");
            window.location.href = "/";
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}

export function useRegisterUser () {

    return useMutation({
        mutationFn: ({fullName, userName, email, password, profilePicUpload}: {fullName: string, userName: string, email: string, password: string, profilePicUpload: any}) => {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('password', password);
            if (profilePicUpload) {
                formData.append('profileImageURL', profilePicUpload);
            }
            return registerUser(formData);
        },
        onSuccess() {
            toast.success("User Registered Successfully!");
            window.location.href = "/";
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}

export function useUpdateUser () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({fullName, email, oldPassword, password, profilePicUpload}: {fullName?: string, email?: string, oldPassword?: string ,password?: string, profilePicUpload?: any}) => {
            const formData = new FormData();
            if(fullName) {
                formData.append('fullName', fullName);
            }
            if(email) {
                formData.append('email', email);
            }
            if(oldPassword) {
                formData.append("oldPassword", oldPassword);
            }
            if(password) {
                formData.append('password', password);
            }
            if (profilePicUpload) {
                formData.append('profileImageURL', profilePicUpload);
            }
            return updateUserProfile(formData);
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["user"]})
            toast.success("User Upated Succcessfully!");
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}

export function useSendFriendRequest () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (friendId: string) => sendFriendRequest(friendId),
        onSuccess() {
            toast.success("Friend Request Sent!");
            queryClient.invalidateQueries({queryKey: ["search"]})
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }

    })
}

export function useRespondFriendRequest () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({friendshipId, response}: {friendshipId: string, response: string}) => respondFriendRequest(friendshipId, response),
        onSuccess() {
            toast.success("Friend Request Accepted!!");
            queryClient.invalidateQueries({queryKey: ["chat", "requests"]})
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}


// mutation for sending message 
export function useAddChatMessages () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({senderId, message, chatId}: {senderId: string, message: string, chatId: string}) => addChatMessages(senderId, message, chatId),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["chat"]})
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}

export function useAddChatAttachement () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({senderId, formData}: {senderId: string, formData: FormData}) => addChatAttachements(senderId, formData),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["chat"]})
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}

export function useCreateNewGroup () {
    const dispatch = useDispatch<AppDispatch>();
    return useMutation({
        mutationFn: ({name, members}: {name: string, members: Array<string>}) => createNewGroup(name, members),
        onSuccess(data, variables, context) {
            // dispatch(logout());
            toast.success("Group Created Successfully");
        },
        onError: (error: IAxiosErrorResponse) => {
            if(error?.message === "Network Error") {
                toast.error("Please check your network!");
            } 
            else {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
        }
    })
}