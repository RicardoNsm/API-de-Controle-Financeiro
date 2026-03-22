import { Router } from "express";
import { UserController } from "./controllers/userController.js";
import { TransactionController } from "./controllers/TransactionController.js";
import { LoginController } from "./controllers/LoginController.js";
import { VerifyAuth } from "./midlleware/VerifyAuth.js";

export const router = Router();

const userController = new UserController();
const transactionController = new TransactionController();
const loginController = new LoginController();

router.post("/login", loginController.login);

router.post("/users", userController.createUser);

router.get("/users/:id", VerifyAuth ,userController.getUserById);
router.get("/users", VerifyAuth, userController.getAllUsers);
router.delete("/users/me", VerifyAuth, userController.deleteUser);


router.post("/transactions", VerifyAuth, transactionController.createTransaction);
router.get("/transactions/summary", VerifyAuth, transactionController.getTransactionSummary);
router.get("/transactions/:id", VerifyAuth, transactionController.getTransactionById);
router.get("/transactions", VerifyAuth, transactionController.getAllTransactions);
router.get("/transactions/me", VerifyAuth, transactionController.getTransactionByUserId);
router.put("/transactions/:id", VerifyAuth, transactionController.updateTransaction);//bug
router.delete("/transactions/:id", VerifyAuth, transactionController.deleteTransaction);