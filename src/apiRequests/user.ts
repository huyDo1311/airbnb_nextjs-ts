import http from "@/lib/http"
import { GetUserResponseType } from "@/schemaValidations/user.schema"

const userApiRequest = {
    NextClientToServerGetUser: (id:number) => http.get<GetUserResponseType>(`/api/users/${id}`),
}

export default userApiRequest