import userApiRequest from "@/apiRequests/user"
import { useQuery } from '@tanstack/react-query';



export const useUserProfile = (id:number) => {
    return useQuery({
        queryKey: ['user',id],
        queryFn: () => userApiRequest.NextClientToServerGetUser(id),
    })
}



