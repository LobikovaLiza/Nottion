
import { z } from "zod";



export const User = z.object({
    email: z.string().email({message: 'Пожалуйста введите правильный email'}),
    password: z.string().min(8).regex(/^(?=.*[A-Z](?=.*[a-z]))(?=.*\d)[A-Za-z\d]{8,}$/),
    date: z.number(),
  });