import { jest } from '@jest/globals'
import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock.js"
import { UserRepository } from "./UserRepository.js"
import { User } from "../entities/UserEntities.js"
import { mock } from 'node:test'

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
            saveReturn: mockUser
        })
        userRepository = new UserRepository(managerMock as EntityManager)
    })
    it('deve criar um usuario', async () => {
        const response = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })
})