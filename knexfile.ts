import path from 'path'
module.exports = {
  client: 'pg',
    connection: {
      host : 'localhost',
      user : "docker",
      password : 'docker',
      database : 'recrurajr'
    },
    migrations : {
        directory : path.resolve(__dirname, 'src', 'database', 'migrations')
    },
};