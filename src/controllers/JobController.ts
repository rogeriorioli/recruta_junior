import {Request , Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface JobData {
  title: string
    job_description : string,
    tags : []
}


export default class JobController {
  async create(req : Request, res: Response) {
        const token = req.headers.authorization
        const user_id = req.headers.userid
        const { title, job_description, tags } : JobData = req.body

        if(!token) {
            return res.status(400).json({err : 'not permited '})
        }

          const [id] = await db('job_offer').insert({
              id : v4(), 
              user_id,
              title,
              job_description,
              tags
        })    

        return res.json({
          message : 'dados inseridos com sucesso',
          data : req.body
        })
    }
  }