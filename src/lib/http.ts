import envConfig from "@/config";
import { SigninResponseType } from "@/schemaValidations/auth.schema";
// import { normalizePath } from "./utils";
import { redirect } from "next/navigation";
import { normalizePath } from "@/lib/utils";

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
  constructor({
    status,
    payload,
    message = "Lỗi HTTP",
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
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
    super({ status, payload, message: "Lỗi thực thể" });
    this.status = status;
    this.payload = payload;
  }
}

class tokenCybersoft {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on the server side");
    }
    this.token = token;
  }
}

export const clienttokenCybersoft = new tokenCybersoft();

// export const clientSessionToken = new SessionToken();
// let clientLogoutRequest: null | Promise<any> = null;
//isClient = true khi ở môi trườn 'useClient UI component con next server or component handle login'
export const isClient = typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options: CustomOptions = {}
) => {
  // const { body, headers, baseUrl, ...restOptions } = options;
  // console.log("🚀 ~ baseUrl:", baseUrl)

  // console.log('body', body)

  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  // // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;
  // const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  const fullUrl = `${baseUrl}/${normalizePath(url)}`;

  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  if (isClient) {
    let tokenCybersoft = localStorage.getItem("tokenCybersoft");

    if (!tokenCybersoft) {
      tokenCybersoft = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjAxLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MzQ2NTYwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQzNjEzMjAwfQ.1tMnTQqva72K1_dfy7Il8zGazsZvipWNYjtqBrR_2aM`;
    }
    baseHeaders["tokenCybersoft"] = tokenCybersoft;
  } else {
    const tokenCybersoft = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjAxLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MzQ2NTYwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQzNjEzMjAwfQ.1tMnTQqva72K1_dfy7Il8zGazsZvipWNYjtqBrR_2aM`;
    baseHeaders["tokenCybersoft"] = tokenCybersoft;
  }

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload: Response = await res.json();
  //

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  if (isClient) {
    const normalizeURL = normalizePath(url);
    if (normalizeURL === "api/auth/signin") {
      console.log("🚀 ~ payload:", payload);
      const {token}  = (payload as SigninResponseType).content;
        localStorage.setItem("tokenCybersoft", token);
        clienttokenCybersoft.value = (payload as SigninResponseType).content.token;

    } else if (normalizeURL === "api/auth/signout") {
      localStorage.removeItem("tokenCybersoft");
    }
  }

  return payload;
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
