import { z } from 'zod';

// Get User Request Body
export const GetUserBody = z.object({
  id: z.number(), // Chỉ cần số id
}).strict();

export type GetUserBodyType = z.infer<typeof GetUserBody>;
// Get User Response Body
export const GetUserResponse = z.object({
    statusCode: z.number(), // Mã trạng thái HTTP
    content: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().optional(),
      phone: z.string().optional(),
      birthday: z.string().optional(),
      avatar: z.string().nullable(),
      gender: z.boolean(),
      role: z.enum(['USER', 'ADMIN']),
    }),
    dateTime: z.string().datetime(), // ISO 8601 datetime format
  }).strict();
  
  export type GetUserResponseType = z.infer<typeof GetUserResponse>;
  