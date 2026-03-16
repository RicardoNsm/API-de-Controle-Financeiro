import { Transaction } from "typeorm";
import { AppDataSource } from "../database/index.js";
import { User } from "../entities/UserEntities.js";
import { UserRepository } from "../repository/UserRepository.js";

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
    getUserByEmail = async (email: string): Promise<User | null> => {
        return await this.userRepository.getUserByEmail(email)
    }
    getAllUsers = async () => {
        return await this.userRepository.getAllUsers()
    }
    deleteUser = async (id: string) => {
        return await this.userRepository.deleteUser(id);
    }
   
}