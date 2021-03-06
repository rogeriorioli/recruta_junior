import { Response , Request} from "express"
import jwt from 'jsonwebtoken'
import db from '../database/connection'

const authConfig = require('../config/auth');
 interface LoginData {
    email: string,
    password: string
}
export default class CandidateLoginController {
    async authenticate(req : Request, res: Response) {
        const { email, password  } : LoginData = req.body;
        const user = await db('candidate')
        .where( 'email' , email)
        .where('password', password)
        .select('email', 'password', 'id')
        .first()
        if(!user) {
            return res.status(400).json({err : 'user or password wrong'})
        }
        user.password = undefined
        const token = jwt.sign({email: user.email}, authConfig.secret, {
          expiresIn : 86400
        })
        return res.json({permissions : {token : token , user: user.id}})
    }
}