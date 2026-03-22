import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock.js"
import { UserRepository } from "./UserRepository.js"


describe('UserRepository', () => {
    let userRepository : UserRepository
    let managerMock : Partial<EntityManager>

   const mockUser = {
        id: '123456',
        name: 'Joana',
        email: 'test@',
        password: '123456'
    }

    beforeAll( async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser,
            findOneReturn: mockUser,
            findReturn: [mockUser],
            deleteReturn: { affected: 1, raw: [] }
        })
        userRepository = new UserRepository(managerMock as EntityManager)
    })
    it('deve criar um usuario', async () => {
        const response = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('deve pegar o user pelo id', async () => {
        const response = await userRepository.getUserById("123456")
        expect(managerMock.findOne).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('deve retornar o user pelo email', async () => {
        const response = await userRepository.getUserByEmail('test@')
        expect(managerMock.findOne).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('deve retornar o user pelo email e password', async () => {
         const response = await userRepository.getUserByEmailandPassword('test@', '123456')
         expect(managerMock.findOne).toHaveBeenCalled()
         expect(response).toMatchObject(mockUser)
    })
    it('deve retornar todos os users', async () => {
        const response = await userRepository.getAllUsers()
        expect(managerMock.find).toHaveBeenCalled()
        expect(response).toMatchObject([
            mockUser
        ])
    })
    it('deve deletar um usuario', async () => {
        const mockDeleteResult = { affected: 1, raw: [] }
        const response = await userRepository.deleteUser('123456')
        expect(managerMock.delete).toHaveBeenCalled()
        expect(response).toMatchObject(mockDeleteResult)
    })
})