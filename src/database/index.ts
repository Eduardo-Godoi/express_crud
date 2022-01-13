import { ConnectionOptions } from "typeorm";
import DbConfig from "../config/dbConnect";
import User from "../entities/user.entity";

const { port, database, password, username } = DbConfig.dbData;

const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: port,
  username: username,
  password: password,
  database: database,
  entities: [User],
  synchronize: true,
  logging: false,
};

export default config;
