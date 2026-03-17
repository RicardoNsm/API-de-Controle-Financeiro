import { Request, Response} from "express"
import { UserService } from "../service/userService.js";


export class LoginController {
    private userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }
    
  login =   async (request: Request, response: Response) => {
    const {email, password} = request.body

    try{
        const token = await this.userService.getToken(email,password)

    return response.status(200).json({token})
    }catch (err){
        return response.status(400).json({ message: "email/password invalid"})
    }
  }
}