import { User } from '../db/models'
import bcrypt from 'bcrypt'

export default class UserService {
  static async registerUser(data) {
    const salt = bcrypt.genSaltSync(10)
    data.password = bcrypt.hashSync(data.password, salt)
    const result = await User.create(data)
    return result 
  }
}
