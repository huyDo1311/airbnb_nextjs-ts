import envConfig from "@/config";
import { SigninResponseType } from "@/schemaValidations/auth.schema";
import { normalizePath } from "./utils";
import { redirect } from "next/navigation";

type CustomOptions = RequestInit & {
  baseUrl?: string;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload, message = 'Lỗi HTTP' }: { status: number; payload: any, message?: string }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message : 'Lỗi thực thể' });
    this.status = status;
    this.payload = payload;
  }
}

/* 
  tạo đối tượng này để lưu giá trị 
  sessionToke 
  expiresAt 
  
  objec này dùng để lưu 
  sesstionToken 
  expriersAt
  of 
  refeshToken
  acceptToken
  đính kèm vào header
  mỗi khi 'useClient' next client (UI component) call api đến server

  Trường hợp dùng
  refeshToken
  acceptToken
  ở slideSession 
  dùng useEffect lấy ra acceptToken -> decode để láy ra expriers so sánh với newDate() này hiện tại < 1h
  dùng refeshToken call api đến server set lại expires và lưu vào object này và next server reponse về lưu vào header cookie

  cách 2
  next client call api(truyền refesh token) đến next server với route= /api/refesh-token, 
  next server call api(truyền refesh token) server  với route = /auth/refesh-token
  next server nhận reponse từ server set vào cookie
  http handle lưu vào object next client
 */
// class SessionToken {
//   private token = "";
//   private _expiresAt = new Date().toISOString();
//   get value() {
//     return this.token;
//   }
//   set value(token: string) {
//     if (typeof window === "undefined") {
//       throw new Error("Cannot set token on the server side");
//     }
//     this.token = token;
//   }
//   get expiresAt() {
//     return this._expiresAt;
//   }
//   set expiresAt(expireAt: string) {
//     if (typeof window === "undefined") {
//       throw new Error("Cannot set token on the server side");
//     }
//     this._expiresAt = expireAt;
//   }
// }

// export const clientSessionToken = new SessionToken();

/* 
  clientLogoutRequest = null
  khi không thực hiện call api logout
clientLogoutRequest = promise
  khi đang thực hiện request logout trạn thái pendding
tạo biến này để logout 1 lần
 */
// let clientLogoutRequest: null | Promise<any> = null;
//isClient = true khi ở môi trườn 'useClient UI component con next server or component handle login'
export const isClient = typeof window !== 'undefined';
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options: CustomOptions = {}
) => {
  // const { body, headers, baseUrl, ...restOptions } = options;
  // console.log("🚀 ~ baseUrl:", baseUrl)


  // console.log('body', body)

  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }
  // // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ?  envConfig.NEXT_PUBLIC_API_ENDPOINT
      :  options.baseUrl 
  // const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  const fullUrl = `${baseUrl}/${normalizePath(url)}`;
  console.log('fullUrl', fullUrl);
  const baseHeaders: {
    [key: string]: string
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'      
        }
  if (isClient) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`
    }
  }


  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })

  const payload: Response = await res.json();
  const data = { status: res.status, payload };


  /* 
    Interceptor xử lý request và response trước khi trả về cho component
    Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
    Nếu xảy ra lỗi
    chỗ này bắng lỗi 
    authencation

   */
  // if (!res.ok) {
  //   if (res.status === ENTITY_ERROR_STATUS) {
  //     throw new EntityError(
  //       data as {
  //         status: 422;
  //         payload: EntityErrorPayload;
  //       }
  //     );
  //   } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
  //     //Xử lí buộc logout ở client
  //     /* 
  //       nhảy quả route next server cal api next server to server logout
  //      */
  //     if (isClient) {
  //       /* 
  //         nếu logut không = null
  //        */
  //       if (!clientLogoutRequest) {
  //         /* 
  //           gán logout = 1 call api
  //           buộc logout trong trường hợp token hết hạn khi người dùng 1 tg k đăng nhập
  //           server sẽ xoá đi token 
  //           đăng nhập trở lại sẽ cấp mới sessionToken kèm expriersAt mới
  //           xử lý ở 'useClient' (next client) trước 
  //          */
       
  //         await fetch("/api/auth/logout", {
  //         method: "POST",
  //         body: null,
  //         headers: {
  //           ...baseHeaders,
  //         } as any,
  //         })
  //         try {
  //           await clientLogoutRequest;
  //         } catch (error) {
  //           console.log("🚀 ~ error:", error);
  //         } finally {
  //           localStorage.removeItem('accessToken')
  //           // localStorage.removeItem('sessionTokenExpiresAt')

  //           /* 
  //             set object sessionToke  = ''
  //             expiresAt này hôm nay
  //            */
  //           // clientSessionToken.value = "";
  //           // clientSessionToken.expiresAt = new Date().toUTCString();
  //           /* 
  //             trả logout về trạng thái null
  //            */
  //           clientLogoutRequest = null;
  //           location.href = "/login";
  //         }
  //       }
  //       /*
  //         Ở next server đá qua logout client và truyền session vì next server không lưu cookie 
  //         cookie được lưu ở browser next server chỉ call api đến server và trả về response từ server
  //         next server ở api/auth
  //         next server sẽ được gọi từ 'user client' next clien (UI compont) thông qua http nếu uslBase = '' rỗng
  //         Kiểm tra sessionToken trong object === param truyền qua thì call api logout 
  //         nhảy vào route next server call api next server to server xoá cookie
  //        */
  //     } else {
  //       const accessToken = (options?.headers as any)?.Authorization.split(
  //         "Bearer "
  //       )[1];
  //       redirect(`/logout?accessToken=${accessToken}`);
  //     }
  //   } else {
  //     console.log(data);
  //     throw new HttpError(data);
  //   }
  // }
  //Client
  /*
    chỗ này xửa lý khi file http chạy ở client (UI component)
    chạy ở client browser
    window = 'undefind': chạy ở next server
    window !== 'undefint': chạy ở file có 'use client' next client
   */
  // if (isClient) {
  //   // Automatically handle session token management

  //   if (
  //     ["auth/login", "auth/register"].some(
  //       (item) => item === normalizePath(url)
  //     )
  //   ) {
  //     /* 
  //     set object sesstionToken = res.token trả về từ server
  //     set object expiersAt = res.expersAt từ res server trả về
  //      */
  //     // clientSessionToken.value = (payload as SigninResponseType).data.token;
  //     // clientSessionToken.expiresAt = (payload as SigninResponseType).data.expiresAt;

  //     const { token } = (payload as SigninResponseType).content;
  //     console.log('token', token);
  //     localStorage.setItem('accessToken', token);
  //   } else if ("auth/logout" === normalizePath(url)) {
  //     /* 
  //       ngược lại logout thì xoá giá trị
  //      */
  //     // clientSessionToken.value = "";
  //     // clientSessionToken.expiresAt = new Date().toUTCString();

  //     localStorage.removeItem('accessToken');
  //   }
  // }

  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, "body">) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body">
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, "body">) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, "body">) {
    return request<Response>("DELETE", url, options);
  },
};

export default http;

//---------------------------------------------- axios ----------------------------------------------
