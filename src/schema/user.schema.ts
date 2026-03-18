import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(100),
  
  email: z.string()
    .email({ message: "Insira um e-mail válido" }),
  
  password: z.string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[\W_]/, { message: "A senha deve conter pelo menos um caractere especial" }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;