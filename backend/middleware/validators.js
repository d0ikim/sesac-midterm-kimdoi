const { body, param, validationResult } = require('express-validator')

// 1. 회원가입 검사기 - 이메일, 비밀번호, 닉네임 입력이 정확하게 왔는지 검사
exports.signUpValidator = [
  // 필수 값이 모두 있는지 확인(O)
  // 이메일 형식이 올바른지 확인(O)
  body('email')
    .isEmail().withMessage('이메일 형식이 아닙니다')
    .notEmpty().withMessage('이메일이 없습니다.'),
  body('password')
    .notEmpty().withMessage('비밀번호가 없습니다.'),
  body('nickname')
    .notEmpty().withMessage('닉네임이 없습니다.'),
];

// 2. 로그인 입력 검사기
exports.loginValidator = [
  body('email')
    .isEmail().withMessage('이메일형식이 아닙니다')
    .notEmpty().withMessage('이메일이 없습니다.'),
  body('password')
    .isLength({ min: 6 }).withMessage('비밀번호가 6자 이하')
    .notEmpty().withMessage('패스워드드이 없습니다.'),
]

// 3. 할 일 생성 API (jwt인증 필)
exports.createTodoValidator = [
  body('title')
    .notEmpty().withMessage('타이틀이 없습니다.'),
  body('content')
    .notEmpty().withMessage('컨텐츠가 없습니다.'),
]

// 4. 할 일 목록 조회 검사기
exports.getTodoValidator = [
  param('todo_id')
    .isInt().withMessage('todo_id는 숫자여야 합니다.')
    .notEmpty().withMessage('todo_id가 필요합니다.'),
]


// 검사 결과 처리기 - 검사결과가 성공/실패인지 확인하는 중간체크함수
exports.handleValidationResult = (req, res, next) => {
  const result = validationResult(req).errors;// express-validator에서 가져온 validationResult
  if (result.length !== 0) {
    // 입력 오류가 있는 경우
    const extracteError = result.map(err => err.msg)
    return next(new Error("InputValidation"));
  }
  next();
}