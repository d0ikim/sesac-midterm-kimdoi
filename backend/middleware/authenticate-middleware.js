// 인증(Authenticate) 파일
const jwt = require('jsonwebtoken')
const SECRET_KEY = "sesac"

module.exports = function (req,res,next){
  // 토큰 인증 함수(라우터.js 에서 authenticateToken라는 이름으로 불려서 씀)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const verifiedToken = verifyToken(token)
  if(!verifyToken(token)){
    return next(new Error("TokenNotMatched"))
  }
  
  req.user = verifiedToken.userId;
  next();
}

function verifyToken(token){
  try{
    return jwt.verify(token, SECRET_KEY);
  } catch(e){
    console.error("JWT Error:", e.message); // 이거 추가!
    return false
  }
}