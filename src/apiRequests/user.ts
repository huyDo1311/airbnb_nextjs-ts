import http from "@/lib/http"
import { GetUserResponseType, UserUpdateBodyType, UserUpdateResponseType } from "@/schemaValidations/user.schema"

export const userApiRequest = {
    NextClientToServerGetUser: (id:number) => http.get<GetUserResponseType>(`/api/users/${id}`),
    NextClientToServerUserUpdateProfile: (id:number, body: UserUpdateBodyType) => http.put<UserUpdateResponseType>(`/api/users/${id}`,body),
}

export default userApiRequest