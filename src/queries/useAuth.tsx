import authApiRequest from "@/apiRequests/auth"
import { useMutation} from "@tanstack/react-query"

export const useSigninMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.NextClientToNextServerSignin
    })
}


export const useSignoutMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.NextClientToNextServerSignout
    })
}