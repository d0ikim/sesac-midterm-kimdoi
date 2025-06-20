const prisma = require('../utils/prisma')

class AuthRepository {

  async createUser(email, password, nickname){
    return await prisma.users.create({
      data: {
        email,
        password,
        nickname
      }
    })
  }

  async login(email){
    return await prisma.users.findFirst({
        where: { email=email }
      })
  }
}

module.exports = new AuthRepository();