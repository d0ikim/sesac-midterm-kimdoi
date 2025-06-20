const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticate-middleware')

const { signUpValidator,loginValidator,handleValidationResult } = require('../middleware/validators')
const AuthController = require('../controllers/auth.controller')  // 컨트롤러 가져옴


/** 1. 회원가입 API
 * 이메일, 비밀번호, 닉네임 입력이 정확하게 왔는지 검증(signUpValidator)
 * 이메일 형식이 올바른지 확인(signUpValidator)
 * 이메일 중복값이 있는지 확인(signUpValidator)
 * 필수 값이 모두 있는지 확인(signUpValidator)
 * 데이터베이스에 저장(AuthController.signUp)
 */
router.post('/signup', signUpValidator, handleValidationResult, AuthController.signUp)


/** 로그인 API
 * 1. 이메일, 비밀번호 입력 여부 확인(loginValidator)
 * 2. 이메일에 해당하는 사용자 찾기(AuthRepository.login)
 * 3. 사용자 존재 여부(AuthService.login)
 * 4. 비밀번호 일치 여부 확인(AuthService.login)
 * 5. JWT 토큰 발급(AuthService.signUp)
 * 6. 생성된 데이터를 전달(AuthController.login)
 */
router.post('/login',
  loginValidator,
  handleValidationResult,
  AuthController.login
)

router.get("/user",authenticateToken, (req,res,next)=>{
  console.log(req.user);
})

module.exports = router;