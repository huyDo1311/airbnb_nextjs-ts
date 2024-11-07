import http from "@/lib/http";
import { SigninBodyType, SigninResponseType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
  NextServerToServerSignin: (body:SigninBodyType ) => http.post<SigninResponseType>(`/api/auth/signin`,body),
  NextClientToNextServerSignin: (body:SigninBodyType) => http.post<SigninResponseType>(`/api/auth/signin`,body, {
    baseUrl: '',
  }),
}

export default authApiRequest