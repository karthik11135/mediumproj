import z from 'zod';

export const signupInput = z.object({
    email: z.string().email() ,
    password: z.string(), 
    name: z.string().optional(), 
})

export type signupType = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(), 
    password: z.string(), 
})

export type signinType = z.infer<typeof signinInput>

export const newPostInput = z.object({
    title: z.string(), 
    content: z.string(), 
})

export type newPostType = z.infer<typeof newPostInput>

export const updatePostInput = z.object({
    title: z.string().optional(), 
    content: z.string().optional(), 
})

export type updatePostType = z.infer<typeof updatePostInput>