import userApiRequest from "@/apiRequests/user"
import { useQuery } from '@tanstack/react-query';



export const useUserProfile = (id:number, handleFetch: boolean) => {
    return useQuery({
        queryKey: ['user',id],
        queryFn: () => userApiRequest.NextClientToServerGetUser(id),
        enabled: handleFetch && id !== 0
    })
}



