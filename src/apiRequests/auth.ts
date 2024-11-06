import http from "@/lib/http";
import { SigninBodyType, SigninResponseType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
  NextServerToServerSigin: (body:SigninBodyType ) => http.post<SigninResponseType>(`/api/auth/signin`,body),
  NextClientToNextServerSigin: (body:SigninBodyType ) => http.post<SigninResponseType>(`/api/auth/signin`,body, {
    baseUrl: ''
  }),
}

export default authApiRequest