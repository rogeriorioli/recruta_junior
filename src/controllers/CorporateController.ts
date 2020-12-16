import {Request , Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface CorpData {
    name_company : string,
    description_company : string,
    site_company : string,
    logo_company : string,
    linked_in : string,
    adress_company : string,
}


export default class CorporateController {
  async create(req : Request, res: Response) {
        const token = req.headers.authorization
        const user_id = req.headers.userid
        const { 
          name_company ,
          description_company , 
          site_company,
          logo_company, 
          linked_in, 
          adress_company } : CorpData = req.body

        if(!token) {
            return res.status(400).json({err : 'not permited '})
        }

          const [id] = await db('corp_data').insert({ 
             id : v4(),
             user_id,
             name_company,
             description_company,
             site_company,
             logo_company,
             linked_in,
             adress_company,
        })    

        return res.json({
          message : 'dados inseridos com sucesso',
          data : req.body
        })
    }
  }