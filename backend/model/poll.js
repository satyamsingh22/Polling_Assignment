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
    type: DataTypes.JSONB,
    defaultValue: {},  // Default empty object for votes
  },
});

export default Poll;
