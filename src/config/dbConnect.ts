require("dotenv/config");

interface DbData {
  port?: number;
  username: string;
  password: string;
  database: string;
}

export default {
  dbData: <DbData>{
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  },
};
