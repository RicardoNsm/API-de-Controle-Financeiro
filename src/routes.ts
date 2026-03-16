import { Router } from "express";
import { UserController } from "./controllers/userController.js";
import { TransactionController } from "./controllers/TransactionController.js";

export const router = Router();

const userController = new UserController();
const transactionController = new TransactionController();

router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.get("/users", userController.getUserByEmail);
router.get("/user", userController.getAllUsers);
router.delete("/user/:id", userController.deleteUser);

router.post("/transaction", transactionController.createTransaction);
router.get("/transaction/:id", transactionController.getTransactionById);
router.get("/users/:id_user/transactions", transactionController.getTransactionByUserId);