import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';


const Poll = sequelize.define('Poll', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  votes: {
    type: DataTypes.JSONB, // JSON object to track votes for each option
    defaultValue: {},
  },
});

export default Poll;
