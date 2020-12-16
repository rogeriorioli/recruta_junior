import knex from 'knex'


const db = knex({
    client: 'pg',
    version: '13.1',
  connection: {
     host : 'localhost',
      user : "docker",
      password : 'docker',
      database : 'recrurajr'
  }
 });

 export default db;
