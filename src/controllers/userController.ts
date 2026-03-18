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
    // Adicione o 'async' aqui
createUser = async (request: Request, response: Response): Promise<Response> => {
    try {
        const user = request.body; // Este já é o objeto { name, email, password }
        
        // MUDANÇA MÍNIMA: Passe 'user' em vez de 'user.name, user.email, user.password'
        await this.userService.createUser(user); 

        return response.status(201).json({ message: "User created successfully" });
   } catch (error: any) {
        // Se o erro for do Zod, retornamos os erros detalhados por campo
        if (error instanceof z.ZodError) {
            return response.status(400).json({
                message: "Erro de validação",
                errors: error.flatten().fieldErrors // Isso deixa o erro limpo!
            });
        }

        // Se for outro erro (como e-mail já cadastrado), retorna a mensagem simples
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
       
       try{
         const users = await this.userService.getAllUsers()
        return response.status(200).json(users)

       }catch(err){
        return(err)
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