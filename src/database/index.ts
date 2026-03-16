import { DataSource } from "typeorm/index.js";
import { User } from "../entities/UserEntities.js";
import { Transaction } from "../entities/TransactionEntities.js";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    synchronize: false, 
    logging: true,
    entities: [
        User,
       Transaction
    ],
    migrations: [
        "src/database/migrations/*.ts"
    ],
});