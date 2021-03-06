import {Request , Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'
export default class ImageController {
  async create(req : Request, res: Response) {
        const token = req.headers.authorization
        const user_id = req.headers.userid
       // @ts-ignore
        const { originalname : name , size , key, location : avatar_url = ''} = req.file


        if(!token) {
            return res.status(400).json({err : 'not permited '})
        }

          const [id] = await db('user_avatar').insert({
              id : v4(), 
              user_id,
              avatar_url
        })    

        return res.json({
          message : 'dados inseridos com sucesso',
          data : avatar_url
        })
    }
  }