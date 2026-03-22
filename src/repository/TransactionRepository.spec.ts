import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock.js"
import { TransactionRepository } from "./TransactionRepository.js"

describe('TransactionRepository', () => {
    let managerMock: Partial<EntityManager>
    let transactionRepository: TransactionRepository


   const mockTransaction = { 
            id: '123456',
            title: 'salario',
            amount: 1200,
            type: 'expense',
            id_user: '123456'
    }
     beforeAll( async () => {
            managerMock = await getMockEntityManager({
                saveReturn: mockTransaction,
                findOneReturn: mockTransaction,
                findByReturn: [mockTransaction],
                findReturn: [mockTransaction],
                deleteReturn: { affected: 1, raw: [] },
                findOneByReturn: mockTransaction,
                mergeReturn: mockTransaction
            })
            transactionRepository = new TransactionRepository(managerMock as EntityManager)
        })
    
    it('deve criar nova transação', async () => {
       const response = await transactionRepository.createTransaction(mockTransaction)
       expect(managerMock.save).toHaveBeenCalled()
       expect(response).toMatchObject(mockTransaction)
    })
    it('pega transação pelo id', async () => {
        const response = await transactionRepository.getTransactionById('123456')
        expect(managerMock.findOne).toHaveBeenCalled()
        expect(response).toMatchObject({
                id: '123456',
                title: 'salario',
                amount: 1200,
                type: 'expense',
                id_user: '123456'
        })
    })

     it('pega transação pelo id de usuario', async () => {
            const response = await transactionRepository.getTransactionByUserId('123456')
            expect(managerMock.findOne).toHaveBeenCalled()
            expect(response).toMatchObject([mockTransaction])
        })

        it('deve atualizar uma transaction', async () => {
            const response = await transactionRepository.updateTransaction('123456', {
                amount: 1000
            })
            expect(managerMock.findOneBy).toHaveBeenCalled()
            
        })
        
        it('deve deletar um usuario pelo id', async () => {
            const mockDeleteResult = { affected: 1, raw: [] }
            const response = await transactionRepository.deleteTransaction('123456')
            expect(managerMock.delete).toHaveBeenCalled()
            expect(response).toMatchObject(mockDeleteResult)
        })
})