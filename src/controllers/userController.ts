import { Request, Response } from "express";
import { UserService } from "../service/userService.js";
import { z } from 'zod';


export class UserController {
    private userService: UserService;

    constructor(
        userService = new UserService()
    ){
        this.userService = userService;
    }

createUser = async (request: Request, response: Response): Promise<Response> => {
    try {
        const user = request.body;
        
        await this.userService.createUser(user); 
 
        return response.status(201).json({ message: "User created successfully" });
   } catch (error: any) {
        if (error instanceof z.ZodError) {
            return response.status(400).json({
                message: "Erro de validação",
                errors: error.flatten().fieldErrors 
            });
        }
        return response.status(400).json({ error: error.message });
    }
}

    getUserById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const user = await this.userService.getUserById(id as string);

        if(user){
            return response.status(200).json({
            id: user?.id,
            name: user?.name,
            email: user?.email
        })
        }
        return response.status(400).json({ message: "usuario não encontrado"})
       
    }
    

    getAllUsers = async (request: Request,response: Response) => {
       
    try {
            const page = Math.max(1, Number(request.query.page) || 1);
            const limit = Math.max(1, Number(request.query.limit) || 10);

            const result = await this.userService.getAllUsers(page, limit);

            return response.status(200).json(result);

        } catch (err: any) {
            // 4. Tratamento de erro básico
            console.error("Erro no UserController:", err.message);
            return response.status(500).json({ 
                error: "Erro interno ao processar a listagem de usuários",
                details: err.message 
            });
        }
    }
    deleteUser = async (request: Request, response: Response) => {
        
    if (!request.user) {
    return response.status(401).json({ message: "não autorizado" })
    }

     const userId = request.user.id 
    
      await this.userService.deleteUser(userId)

    return response.status(200).json({ message: "usuário deletado" })
}
}