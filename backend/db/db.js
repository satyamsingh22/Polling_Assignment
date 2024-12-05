import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Pollying', 'postgres', 'satyam2203', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
