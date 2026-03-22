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
         const { title, amount, type } = request.body

         if (!request.user) {
        return response.status(401).json({ message: "não autorizado" })
        }

        const userId = request.user?.id
       

        this.transactionService.createTransaction(
            title,
            amount,
            type,
            userId
        )
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
        
          if (!request.user) {
        return response.status(401).json({ message: "não autorizado" })
        }

        const userId = request.user.id

         const transactions = await this.transactionService.getTransactionByUserId(userId);

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
     deleteTransaction = async (request: Request, response: Response) => {
        const { id } = request.params
    
    try{
        this.transactionService.deleteTransaction(id as string)
        return response.status(200).json({ message: "transaction deletada"})
    } catch (err: any) {
        return response.status(400).json({ message:"Erro ao deletar transaction" });
    }
    }

    getAllTransactions = async (request: Request, response: Response) => {

        const page = Math.max(1,Number(request.query.page) || 1)
        const limit = Math.max(1,Number(request.query.limit) || 10)

        const result = await this.transactionService.getAllTransaction(page, limit)

        return response.status(200).json(result)
    }

    getTransactionSummary = async (request: Request, response: Response) => {
          
        if (!request.user) {
        return response.status(401).json({ message: "não autorizado" })
        }

        const userId = request.user.id

        const transactions = await this.transactionService.getTransactionSummary(userId)

        return response.status(200).json({transactions})
    }
}