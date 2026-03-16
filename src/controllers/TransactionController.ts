import { TransactionService } from "../service/TransactionService.js";
import { Request, Response } from "express";


export class TransactionController {
    private transactionService: TransactionService;
   
       constructor(
           transactionService = new TransactionService()
       ){
           this.transactionService = transactionService;
       }
       createTransaction = (request: Request, response: Response) => {
        const transaction = request.body;
        this.transactionService.createTransaction(transaction.title,transaction.amount,transaction.type,transaction.id_user)
        return response.status(200).json({ message : "created successfully"})
       }
       getTransactionById = async (request: Request, response: Response) => {
        const {id} = request.params;
        const transaction = await this.transactionService.getTransactionById(id as string);

       if(transaction){
         return response.status(200).json({
           id:  transaction?.id,
           title: transaction?.title,
           amount: transaction?.amount,
           type: transaction?.type,
           id_user: transaction?.id_user
        })
       }
       return response.status(400).json({ message: "transação não encontrado"})
       }
       getTransactionByUserId = async (request: Request, response: Response) => {
        const {id_user} = request.params;
         const transactions = await this.transactionService.getTransactionByUserId(id_user as string);

         return response.status(200).json(transactions)
         
       }
        updateTransaction = async (request: Request, response: Response) => {
        const {id} = request.body
        const {title,amount,type} = request.body
        const transaction = this.transactionService.updateTransaction(id, 
            title,
            amount,
            type
        )
        return response.status(200).json(transaction)
    }
}