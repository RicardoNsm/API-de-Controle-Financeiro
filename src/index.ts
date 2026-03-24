import express from 'express';
import type { Request, Response } from 'express';
import { AppDataSource } from './database/index.js';
import { router } from './routes.js';
import 'reflect-metadata';
import cors from "cors"


const server = express();

AppDataSource.initialize()
.then(() => {
    console.log('Data Source has been initialized!');
})
.catch((err) => {
    console.log(err);
})

server.use(cors())
server.use(express.json());
server.use(router)

server.get('/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'controle financeiro API'});
})
server.listen(3000, () => console.log('server on'));