import { z } from 'zod';

// Signup Request Body
export const SignupBody = z.object({
  id: z.number(),
  name: z.string().min(1).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  phone: z.string().optional(),
  birthday: z.string().optional(),
  gender: z.boolean(),
  role: z.enum(['USER','ADMIN']) 
}).strict();

export type SignupBodyType = z.infer<typeof SignupBody>;

// Signup Response Body
export const SignupResponse = z.object({
  statusCode: z.number(),
  content: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100).optional(),
    phone: z.string().optional(),
    birthday: z.string().optional(),
    avatar: z.string().nullable(),
    gender: z.boolean(),
    role: z.enum(['USER','ADMIN']) 
  }),
  dateTime: z.string().datetime() // Ensures it matches an ISO 8601 datetime format
}).strict();

export type SignupResponseType = z.infer<typeof SignupResponse>;

// Signin Request Body
export const SigninBody = z.object({
  // email: z.string().email(),
  // password: z.string().min(6).max(100)
  email: z.string(),
  password: z.string()
}).strict();

export type SigninBodyType = z.infer<typeof SigninBody>;

// Signin Response Body
export const SigninResponse = z.object({
  statusCode: z.number(),
  content: z.object({
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().optional(), // Optional as it might be blank
      phone: z.string().optional(),
      birthday: z.string().optional(),
      avatar: z.string().optional(),
      gender: z.boolean(),
      role: z.enum(['USER', 'ADMIN'])
    }),
    token: z.string()
  }),
  dateTime: z.string().datetime()
}).strict();

export type SigninResponseType = z.infer<typeof SigninResponse>;
