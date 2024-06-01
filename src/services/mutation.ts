import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutUser, loginUser, registerUser, respondFriendRequest, sendFriendRequest } from "./api";
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
        mutationFn: ({fullName, userName, email, password}: {fullName: string, userName: string, email: string, password: string}) => registerUser(fullName, userName, email, password),
        onSettled: (_, error) => {
            if(!error){
                toast({
                    variant: "default",
                    title: "Register Success",
                })
                window.location.href = "/chat/1";
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                })
            }
        },
    })
}

export function useSendFriendRequest () {
    return useMutation({
        mutationFn: (friendId: string) => sendFriendRequest(friendId),
        onSettled: (_, error) => {
            if(!error){ 
                toast({
                    variant: "default",
                    title: "Friend Request Sent Successfully!",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Error in sending friend request",
                })
            }
        },
    })
}

export function useRespondFriendRequest () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({friendshipId, response}: {friendshipId: string, response: string}) => respondFriendRequest(friendshipId, response),
        onSettled(_, error, variables) {    
            if(!error) {
                queryClient.invalidateQueries({queryKey: ["chat"]})
                toast({
                    variant: "default",
                    title: `Friend Request ${variables.response} Successfully!`,
                })
            } else {
                toast({
                    variant: "destructive",
                    title: 'Some error occured!'
                })
            }
        },
    })
}
