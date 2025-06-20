const prisma = require('../utils/prisma')

class AuthRepository {

  async findByEmail(email){
    return await prisma.users.findFirst({
      where: { email }
    })
  }

  async createUser(email, password, nickname){
    return await prisma.users.create({
      data: {
        email,
        password, // 암호화된 비밀번호로 저장
        nickname
      }
    })
  }

  async login(email){
    // 2. 이메일에 해당하는 사용자 찾기
    return await prisma.users.findFirst({
        where: { email }
      })
  }
}

module.exports = new AuthRepository();