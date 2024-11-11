import userApiRequest from "@/apiRequests/user"
// import { UserUpdateBodyType } from "@/schemaValidations/user.schema";
import { useQuery } from '@tanstack/react-query';



export const useUserProfile = (id:number, handleFetch: boolean) => {
    return useQuery({
        queryKey: ['user',id],
        queryFn: () => userApiRequest.NextClientToServerGetUser(id),
        enabled: handleFetch && id !== 0
    })
}

// export const useUserUpdateProfile = (id:number,body:UserUpdateBodyType) => {
//     return useMutation({
//         mutationFn: (id,body) => userApiRequest.NextClientToServerUserUpdateProfile(id,body),
//     })
// }



