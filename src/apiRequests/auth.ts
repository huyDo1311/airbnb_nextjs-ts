import http from "@/lib/http";
import { SigninBodyType, SigninResponseType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
  NextServerToServerSignin: (body:SigninBodyType ) => http.post<SigninResponseType>(`/api/auth/signin`,body),
  NextClientToNextServerSignin: (body:SigninBodyType) => http.post<SigninResponseType>(`/api/auth/signin`,body, {
    baseUrl: '',
  }),
  NextClientToNextServerSignout: () => http.post(`/api/auth/signout`,null, {
    baseUrl: '',
  }),
}

export default authApiRequest