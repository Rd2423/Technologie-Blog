const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'user',
      //     key: 'id'
      //   }
      // },
      post_content: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [5 , 2000]
          }
      },
      created_at: {
        type: DataTypes.STRING,
    },
    updated_at: {
        type: DataTypes.STRING,
    }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );
  
  module.exports = Post;
  