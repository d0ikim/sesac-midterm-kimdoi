const AuthRepository = require('../repositories/auth.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "sesac"

class AuthService {
  async signUp(email, password, nickname) {
    // 입력받은 이메일을 보고 DB에 값이 있는지 없는지를 체크!
    const exsistingUser = await AuthRepository.findByEmail(email);
    if (exsistingUser) {
      throw new Error("ExistEmail");
    }

    // 가입되지 않은 이메일이면, 비밀번호 암호화
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    const bcryptPassword = await bcrypt.hash(password, salt)

    // 데이터 베이스에 저장
    const newUser = await AuthRepository.createUser(email, bcryptPassword, nickname);

    return {userId:newUser.userId}
  }

  async login(email, password) {
    const user = await AuthRepository.login(email);

    if (!user) {
        // 유저가 없는 경우
        return next(new Error("UserNotFound"));
      }
      // 3. 사용자 존재 여부 확인

      // 4. 비밀번호 일치 여부 확인
      const verifyPassword = await bcrypt.compare(password, user.password);
  
      if(!verifyPassword){
        return next(new Error("PasswordError"));
      }

      // 5. JWT 토큰 발급
      const token = jwt.sign({
        userId : user.userId
      }, SECRET_KEY, {
        expiresIn : "12h"
      })
    return token;
  }
}

module.exports = new AuthService(); // 새 인스턴스(빵) 생성해 사용할 수 있게 내보냄