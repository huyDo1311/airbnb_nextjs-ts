import { FacebookLogin } from "@/constants/type";
import http from "@/lib/http";
import {
  SigninBodyType,
  SigninResponseType,
  SignupBodyType,
  SignupResponseType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  NextServerToServerSignin: (body: SigninBodyType) =>
    http.post<SigninResponseType>(`/api/auth/signin`, body),
  NextClientToNextServerSignin: (body: SigninBodyType) =>
    http.post<SigninResponseType>(`/api/auth/signin`, body, {
      baseUrl: "",
    }),

  NextClientToNextServerFacebookLogin: (body: FacebookLogin) =>
    http.post<SigninResponseType>(`/api/auth/signin`, body),

  NextServerToServerSignup: (body: SignupBodyType) =>
    http.post<SignupResponseType>(`/api/auth/signup`, body),

  NextClientToNextServerSignout: () =>
    http.post(`/api/auth/signout`, null, {
      baseUrl: "",
    }),
};

export default authApiRequest;
