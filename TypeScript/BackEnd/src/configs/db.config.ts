import { IdbConfig } from "src/app/Types/Type";

const dev:IdbConfig ={
    db:{
         host: 'localhost',
         user: 'root',
         password:'123456',
         database: 'projectts',
         dialect: 'mysql',
    },
    pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000,
       },
    };
    
export default dev;