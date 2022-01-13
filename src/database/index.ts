import { ConnectionOptions } from "typeorm";
import User from "../entities/user.entity";

const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "eduardo",
  password: "1234",
  database: "crud_ts",
  entities: [User],
  synchronize: true,
  logging: false,
};

export default config;
