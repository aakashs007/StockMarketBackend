const Locals = require('../providers/locals').config();

module.exports = {
  development: {
    username: Locals.db_user,
    password: Locals.db_password,
    database: Locals.database,
    host: Locals.db_url,
    pool: {
      // handleDisconnects: true,
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialect: "mysql",
    logging: Locals.logging
  },
  testing: {
    username: Locals.db_user,
    password: Locals.db_password,
    database: Locals.database,
    host: Locals.db_url,
    dialect: "mysql"
  },
  production: {
    username: Locals.db_user,
    password: Locals.db_password,
    database: Locals.database,
    pool: {
      handleDisconnects: true,
      max: 10,
      min: 1,
      idle: 10000,
      acquire: 20000
    },
    dialect: "mysql",
    dialectOptions: {
      //socketPath: "/cloudsql/hottab-in:asia-northeast1:api-db"
      socketPath: Locals.db_url
    }
    
  }
}