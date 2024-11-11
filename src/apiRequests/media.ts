import http from "@/lib/http";
import { UploadImageResType } from "@/schemaValidations/media.schema";
import { headers } from "next/headers";

export const mediaApiRequest = {
    upload: (formData: FormData) => {
        const customHeaders = {
            'token': `${localStorage.getItem('userToken') || ''}`,
        };
        console.log('customHeaders', customHeaders);
        return http.post<UploadImageResType>('/api/users/upload-avatar', formData, { headers: customHeaders });
    },
}