import http from "@/lib/http";
import { commentsSchema } from "@/schemaValidations/comments.schema";
interface commentsProps {
  content: commentsSchema[];
}

const commentsRequest = {
  NextClientToServerGetComments: (id: any) =>
    http.get<commentsProps>(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`, {
      next: { tags: ["comments"] },
    }),
  NextClientToServerPostComments: (body: any) => {
    const token = {
      token: `${localStorage.getItem("userToken") || ""}`,
    };
    return http.post<commentsProps>(`/api/binh-luan`, body, {
      headers: token,
    });
  },
};

export default commentsRequest;
