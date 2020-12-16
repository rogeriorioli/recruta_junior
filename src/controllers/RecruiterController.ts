import {Request , Response } from 'express'
import { v4 } from "uuid";

import db from '../database/connection'



export default class RecruiterController {
   async create(req : Request, res: Response)  {
        const id = v4();
        const {
            email,
            password,
            username
        } = req.body
        
        const user = await db('recruiter')
        .column('id')
        .where( 'email' , email)
        .select('email')
        .first()
        if(!user) {       
            await db('recruiter').insert({
                id,
                email, 
                password,
                username,

            })
            return res.status(201).json({id})
        }
        return res.status(400).json({err : "user exist in our base"}) 
    }
  
       async delete(req : Request, res: Response) {
        const token = req.headers.authorization   
        const {id} = req.params;

        const recruiter = await db('recruiter')
        .where({id}).delete()
       
        if(!recruiter) {
            return res.status(400).json({message: "user not found"}) 
        }
        if(!token) {
            return res.status(400).json({err : 'not permited '})
        }
       return res.status(200).json({message : `Recruiter :  ${id}  deleted susseful`,})
    }
}