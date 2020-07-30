'use strict'
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  { tableName: 'users', timestamps: false })

  User.prototype.comparePassword = async function (password) {
    if (!password) {
      return false
    }
    const result = await bcrypt.compare(password, this.password)
    return result
  }
  return User
}
