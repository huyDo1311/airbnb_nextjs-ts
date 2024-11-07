import authApiRequest from "@/apiRequests/auth"
import { useMutation } from "@tanstack/react-query"

export const useSigninMuatation = () => {
    return useMutation({
        mutationFn: authApiRequest.NextClientToNextServerSignin
    })
}