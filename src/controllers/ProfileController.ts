import { Request, Response } from 'express'

import { v4 } from "uuid";

import db from '../database/connection'


interface CandidateProfile {
  name: string,
  born_date: Date,
  phone: string,
  avatar: {},
  description: string,
  website?: string,
  linkedin?: string,
  github?: string,
}

export default class ProfileController {

  public async create(req: Request, res: Response) {
    const token = req.headers.authorization
    const user_id = req.headers.userid
    const date = new Date
    const {
      name,
      born_date,
      phone,
      avatar,
      description,
      website,
      linkedin,
      github

    }: CandidateProfile = req.body

    if (!token) {
      return res.status(400).json({ err: 'not permited ' })
    }

    await db('candidate')
      .where('id', user_id)
      .select('id')
      .select('first_session')
      .first()
      .update({
        'first_session': date
      })

    const [id] = await db('candidate_profile').insert({
      id: v4(),
      user_id,
      name,
      born_date,
      phone,
      description,
      website,
      linkedin,
      github,
    })

    return res.json({
      message: 'dados inseridos com sucesso',
      data: req.body,
      user_id: user_id,
    })
  }
}