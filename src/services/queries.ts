import { useQuery } from "@tanstack/react-query"
import { getChatDetails, getChatMessages, getFriendRequest, getSearchUser, getUserChats, getUserProfile, getsearchFriend, logOutUser } from "./api"


export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserProfile,
        refetchOnWindowFocus: false,

    })
}

export const useGetChats = () => {
    return useQuery({
        queryKey: ["chat"],
        queryFn: getUserChats,
        refetchOnWindowFocus: false
    })
}

export const useSearchUser = (searchTerm: string) => {
    return useQuery({
        queryKey: ["search", searchTerm],
        enabled: !!searchTerm,
        queryFn: ()  => getSearchUser(searchTerm!),
        refetchOnWindowFocus: false,
    })
}

export const useGetFriendRequests = () => {
    return useQuery({
        queryKey: ["requests"],
        queryFn: ()  => getFriendRequest(),
        refetchOnWindowFocus: false
    })
}

export const useSearchFriend = (searchTerm: string) => {
    return useQuery({
        queryKey: ["search", searchTerm],
        enabled: !!searchTerm,
        queryFn: ()  => getsearchFriend(searchTerm!),
        refetchOnWindowFocus: false,
    })
}


export const useGetChatDetails = (chatId: string) => {
    return useQuery({
        queryKey: [],
        queryFn: ()  => getChatDetails(chatId),
        refetchOnWindowFocus: false
    })
}

export const useGetChatMessages = (chatId: string) => {
    return useQuery({
        queryKey: [chatId],
        enabled: !!chatId,
        staleTime: 0,
        queryFn: ()  => getChatMessages(chatId!),
        refetchOnWindowFocus: false
    })
}


// export const useGetFriendsQuery = () => {
//     return useQuery({
//         queryKey: ["friends"],
//         queryFn: getUserProfile,
//         refetchOnWindowFocus: false
//     })
// }



