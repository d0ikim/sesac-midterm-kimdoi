const AuthRepository = require('../repositories/auth.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "sesac"

class AuthService {
  async signUp(email, password, nickname) {
    const exsistingUser = await AuthRepository.findByEmail(email);
    if (exsistingUser) {
      throw new Error("ExistEmail");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    const bcryptPassword = await bcrypt.hash(password, salt)

    const newUser = await AuthRepository.createUser(email, bcryptPassword, nickname);

    return {userId:newUser.userId}
  }

  async login(email, password) {
    const user = await AuthRepository.login(email);

    if (!user) {
        return next(new Error("UserNotFound"));
      }
      const verifyPassword = await bcrypt.compare(password, user.password);
  
      if(!verifyPassword){
        return next(new Error("PasswordError"));
      }

      const token = jwt.sign({
        userId : user.userId
      }, SECRET_KEY, {
        expiresIn : "12h"
      })
    return {accessToken:token};
  }
}

module.exports = new AuthService();