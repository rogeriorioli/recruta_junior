import { Request, Response } from 'express'


import { v4 } from "uuid";

import db from '../database/connection'

interface ResumeData {
  title: string
  resume: string,
  skills: []
}


export default class ResumeController {
  async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const { title, resume, skills }: ResumeData = req.body

    if (!token) {
      return res.status(400).json({ err: 'not permited ' })
    }

    const session = await db('candidate_profile')
      .where('id', user_id)
      .select('id')
      .select('first_session')
      .first()

    console.log(session)

    if (session.first_session === null) {
      res.status(400).json({ err: 'Por favor Complete seu perfil' })
    }

    const [id] = await db('candidate_resume').insert({
      id: v4(),
      user_id,
      title,
      resume,
      skills
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body
    })
  }
}