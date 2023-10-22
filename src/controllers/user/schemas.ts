import { z } from 'zod';

export const registerSchema = z
    .object({
        login: z.string().min(1),
        password: z.string().min(6)
    })
    .strict();

export const loginSchema = registerSchema;

export const postResourceSchema = z
    .object({
        url: z.string().url()
    })
    .strict();
