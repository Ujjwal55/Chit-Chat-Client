import useAuthStore from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutUser, loginUser, registerUser, respondFriendRequest, sendFriendRequest } from "./api";
import { toast } from "@/components/ui/use-toast";
import { useErrors } from "@/hooks/hook";


export function useLoginUser () {

    return useMutation({
        mutationFn: ({userName, password}: {userName: string, password: string}) => loginUser(userName, password),
        onSettled: (_, error) => {
            if(!error){                
                toast({
                    variant: "default",
                    title: "Login Success",
                })
                window.location.href = "/login";
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                })
            }
        },
    })
}

export function useLogOutUser () {
    const {setUser} = useAuthStore();

    return useMutation({
        mutationFn: (userId: string) => logOutUser(userId),
        onSettled: (_, error) => {
            if(!error){
                setUser({
                    user: null,
                    loading: false
                });
                toast({
                    variant: "default",
                    title: "Logout Success",
                })
                window.location.href = "/login";
            } else {
                toast({
                    variant: "destructive",
                    title: "Error in loggin out",
                })
            }
        },
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
