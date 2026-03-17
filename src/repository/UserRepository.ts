import { EntityManager } from "typeorm";
import { AppDataSource } from "../database/index.js";
import { User } from "../entities/UserEntities.js";

export class UserRepository {
    private manager: EntityManager;

    constructor(
        manager = AppDataSource.manager
    ) {
        this.manager = manager
    }

    createUser = async (User: User): Promise<User> => {
        return await this.manager.save(User);
    }
    getUserById = async (id:string): Promise<User | null> => {
        return await this.manager.findOne(User, {
            where: {
                id
            }
        });
    }

    getUserByEmailandPassword = async (email: string,password:string): Promise <User | null> => {
        return await this.manager.findOne(User, {
            where: {
                email,
                password
            }
        })
    }
    getAllUsers = async () => {
        return await this.manager.find(User, {
            select: [
              "id",
              "name",
              "email",
              "password"
            ]
        })
    }
    deleteUser = async (id: string) => {
        return await this.manager.delete(User, {id})
    }
}