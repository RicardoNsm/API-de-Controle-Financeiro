import { jest } from '@jest/globals'
import { EntityManager } from 'typeorm';

interface MockManagerArgs {
    saveReturn?: object | object[]
    findOneReturn?: object
    findByReturn?: any
    findReturn?: object[] | undefined
    deleteReturn?: any
    findOneByReturn?: any
    mergeReturn?: any
}

export const getMockEntityManager = async ({ 
    saveReturn = undefined,
    findOneReturn = undefined,
    findReturn = undefined,
    findByReturn= undefined,
    deleteReturn= undefined,
    findOneByReturn = undefined,
    mergeReturn = undefined
}: MockManagerArgs): Promise<EntityManager> => {
   const manager: Partial<EntityManager> = {}

   manager.save = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(saveReturn)

   manager.findOne = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(findOneReturn)

     manager.find = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(findReturn)

      manager.delete = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(deleteReturn)

      manager.findBy = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(findByReturn)

     manager.findOneBy = jest
     .fn<(...args: any[]) => Promise<any>>()
     .mockResolvedValue(findOneByReturn)
 
     manager.merge = jest.fn()
     .mockReturnValue(mergeReturn) as any
     
   return manager as EntityManager
}