import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

 export function VerifyAuth (request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if(authToken){
        const [, token] = authToken.split(' ')

         try{
        const decoded = jwt.verify(token, '123456789') as any

            request.user = {
                id: decoded.sub
            }
           
        return next()
    }catch(err){
        return response.status(400).json({ message: 'não autorizado'})
    }

    }
     return response.status(400).json({ message: 'não autorizado'})

   
 }