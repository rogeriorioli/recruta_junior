import {Request , Response } from 'express'

import { v4 } from "uuid";

import db from '../database/connection'
interface LoginData {
    email: string,
    password: string,
    username: string
}

export default class CandidateController {
   async create(req : Request, res: Response)  {
        const id = v4()
        const {
            email,
            password,
            username
        } : LoginData = req.body

        const user = await db('candidate')
        .column('id')
        .where( 'email' , email)
        .select('email')
        .first()
        if(!user) {       
            await db('candidate').insert({
                id,
                email, 
                password,
                username,
                user_type : 'candidate'
            })
            return res.status(201).json({
                message: "user successfully create",
                id:  id
                
                })
        }
        return res.status(400).json({err : "user exist in our base"})
    }

    async delete(req : Request, res: Response) {
        const {id} = req.params;

        const candidate = await db('candidate')
        .where({id}).delete()

        if(!candidate) {
            return res.status(400).json({message: "user not found"}) 
        }
      

        return res.json({message : `candidate :  ${id}  deleted susseful`,})
    }
}