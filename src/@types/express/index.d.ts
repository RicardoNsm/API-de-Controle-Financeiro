import { User } from "../path-to-your-user-entity"; // Import your User type/interface

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}