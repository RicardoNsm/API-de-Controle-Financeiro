import { jest } from '@jest/globals'
import { EntityManager } from 'typeorm';

interface MockManagerArgs {
    saveReturn?: object | object[]
    findOneReturn?: object
}

export const getMockEntityManager = async ({ 
    saveReturn = undefined,
    findOneReturn = undefined
}: MockManagerArgs): Promise<EntityManager> => {
   const manager: Partial<EntityManager> = {}

   manager.save = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(saveReturn)

   manager.findOne = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(findOneReturn)

   return manager as EntityManager
}