import {Dialect} from "sequelize"
export interface IdbConfig {
    db: {
      host: string;
      user: string;
      password: string;
      database: string;
      dialect: Dialect;
    };
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  }