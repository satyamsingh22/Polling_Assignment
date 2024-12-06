import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize(process.env.Db_DatabaseName ||'Pollying',process.env.Db_userName || 'postgres',process.env.Db_password || 'satyam2203', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

export default sequelize;
