import { Request, Response } from "express";
import { UserService } from "../service/userService.js";
import { request } from "node:http";

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
    
    getUserByEmail = async (request: Request, response: Response) => {
        const { email } = request.body
        const user = await this.userService.getUserByEmail(email)
          console.log(user)
        if(user){
             return response.status(200).json({
            id: user?.id,
            name: user?.name,
            email: user?.email
        })
        }
        return response.status(400).json({ message: "email não encontrado"})
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
    const { id } = request.params;
    
    try {
        await this.userService.deleteUser(id as string);

        return response.status(200).json({ message: "usuario deletado"});

    } catch (err: any) {
        return response.status(400).json({ message:"Erro ao deletar usuário" });
    }
}
}