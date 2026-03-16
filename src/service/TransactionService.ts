import { Transaction } from "../entities/TransactionEntities.js";
import { TransactionRepository } from "../repository/TransactionRepository.js";

export class TransactionService{
    private transactionRepository: TransactionRepository

    constructor(
        transactionRepository = new TransactionRepository()
    ){
        this.transactionRepository = transactionRepository
    }

    createTransaction = async (title: string,amount: number, type: string, id_user: string ) => {
        const transaction = new Transaction(title,amount,type,id_user);
        return this.transactionRepository.createTransaction(transaction)
    }
    getTransactionById = async (id: string): Promise<Transaction | null> => {
        return this.transactionRepository.getTransactionById(id);
    }
    getTransactionByUserId = async (id_user: string) => {
        return await this.transactionRepository.getTransactionByUserId(id_user)
    }
     updateTransaction = async (id:string, title: string,amount: number, type: string) => {
        return await this.transactionRepository.updateTransaction(id, {
            title,
            amount,
            type
        })
    }
} 