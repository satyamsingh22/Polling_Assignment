import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('polling_db', 'polling_user', 'securepassword', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
