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
     deleteTransaction = async (id:string) => {
        return await this.transactionRepository.deleteTransaction(id)
     }
     getAllTransaction = async (page:number, limit: number) => {
        const offset = (page - 1) * limit
        const [users,total] = await this.transactionRepository.findPaginado(limit,offset)

        return{
            data: users,
            pagination: {
                totalItems: total,
                totalPages: Math.ceil(total/limit),
                currentPage: page
            }
        }
     }

     getTransactionSummary = async (id_user: string) => {
        const transactions = await this.transactionRepository.getTransactionByUserId(id_user)

        const incomeTransaction = transactions.filter(transaction => transaction.type === "income")

        const totalIncome = incomeTransaction.reduce((acumulador, transaction) => acumulador + transaction.amount, 0)

        const expenseTransaction = transactions.filter(transaction => transaction.type === "expense")

        const totalExpense = expenseTransaction.reduce((acumulador, transaction) => acumulador + transaction.amount,0)

        const saldo = totalIncome - totalExpense
        return{
            saldo,
            totalIncome,
            totalExpense
        }
     }
} 