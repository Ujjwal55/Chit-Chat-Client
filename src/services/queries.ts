import { useQuery } from "@tanstack/react-query"
import { getNotificiations, getSearchUser, getUserChats, getUserProfile, logOutUser } from "./api"


export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserProfile,
        refetchOnWindowFocus: false
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
        queryKey: ["chat", searchTerm],
        queryFn: ()  => getSearchUser(searchTerm!),
        refetchOnWindowFocus: false
    })
}

export const useGetNotifications = () => {
    return useQuery({
        queryKey: [],
        queryFn: ()  => getNotificiations(),
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



