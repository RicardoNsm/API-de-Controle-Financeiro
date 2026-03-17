import { AppDataSource } from "../database/index.js";
import { User } from "../entities/UserEntities.js";
import { UserRepository } from "../repository/UserRepository.js";
import jwt from "jsonwebtoken"

export class UserService {
    private userRepository: UserRepository;
    
    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository;
    }
    createUser = async (name:string,email:string,password:string): Promise<User> => {
        const user = new User(name, email, password);
        return await this.userRepository.createUser(user);
    }
    getUserById = async (id: string): Promise<User | null> => {
        return await this.userRepository.getUserById(id);
    }
    getAllUsers = async () => {
        return await this.userRepository.getAllUsers()
    }
    deleteUser = async (id: string) => {
        return await this.userRepository.deleteUser(id);
    }
    getAuthenticateUser = async (email:string, password:string): Promise<User | null> => {
        return this.userRepository.getUserByEmailandPassword(email,password)
    }
    getToken = async (email:string , password: string) => {
        const user = await this.getAuthenticateUser(email,password)

        if(!user){
            throw new Error('email/password invalido')
        }

        const tokenData = {
        name: user?.name,
        email: user?.email
        }
        const tokenKey = "123456789"
        
        const tokenOptions = {
            subject : user?.id
        }
        
        const token = jwt.sign(tokenData, tokenKey, tokenOptions)
        
        return token
    }
   
}