
import knex from 'knex'


const config = require('../../dblocales')


const db = knex({
  client: 'pg',
  version: '13.1',
  connection:
    config.production.database,
})


export default db;

