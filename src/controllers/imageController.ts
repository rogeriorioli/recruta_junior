import {Request , Response } from 'express'
import multer from 'multer'
const multerConfig = require('../config/multer.config')

import { v4 } from "uuid";

import db from '../database/connection'



export default class ImageController {
  async create(req : Request, res: Response) {
        const token = req.headers.authorization
        const user_id = req.headers.userid
        const avatar_url = req.file


        if(!token) {
            return res.status(400).json({err : 'not permited '})
        }

          const [id] = await db('user_avatar').insert({
              id : v4(), 
              user_id,
              avatar_url : avatar_url.path
        })    

        return res.json({
          message : 'dados inseridos com sucesso',
          data : req.file.originalname
        })
    }
  }