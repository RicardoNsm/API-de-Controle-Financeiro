import { EntityManager} from "typeorm";
import { AppDataSource } from "../database/index.js";
import { Transaction } from "../entities/TransactionEntities.js";

export class TransactionRepository{
     private manager: EntityManager;
    
        constructor(
            manager = AppDataSource.manager
        ) {
            this.manager = manager
        }

    createTransaction = async (transaction: Transaction): Promise<Transaction> => {
        return await this.manager.save(transaction)
    }
    getTransactionById = async (id: string): Promise<Transaction | null> => {
        return await this.manager.findOne(Transaction, {
            where: {
                id
            }
        })
    }
     getTransactionByUserId = async (id_user: string): Promise<Transaction[] | null> => {
        return await this.manager.findBy(Transaction, {
                id_user
        })
    }

    updateTransaction = async (id:string, data: Partial<Transaction>)=> {
       const transaction = await this.manager.findOneBy(Transaction ,{id})

       if(!transaction){
        throw new Error("Transaction not found");
       }
       
       this.manager.merge(Transaction, transaction, data);
       return await this.manager.save(transaction);
    }
}