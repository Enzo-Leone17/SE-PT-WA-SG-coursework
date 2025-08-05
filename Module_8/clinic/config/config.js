module.exports = {
  development: {
    username: process.env.DB_HOSTNAME,
    password: process.env.DB_HOSTPASSWORD,
    database: "clinic",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_HOSTNAME,
    password: process.env.DB_HOSTPASSWORD,
    database: "clinic",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_HOSTNAME,
    password: process.env.DB_HOSTPASSWORD,
    database: "clinic",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
