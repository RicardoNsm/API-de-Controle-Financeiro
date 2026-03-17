import { Request, Response } from "express";
import { UserService } from "../service/userService.js";


export class UserController {
    private userService: UserService;

    constructor(
        userService = new UserService()
    ){
        this.userService = userService;
    }
    createUser = (request: Request, response:Response): Response => {
        const user = request.body;
        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({message: "User created successfully"});
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