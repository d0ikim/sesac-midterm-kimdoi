const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticate-middleware')
const { createTodoValidator, getTodoValidator, handleValidationResult} = require('../middleware/validators')  // 유효성검사기
const {checkPostOwner} = require('../middleware/authorization-middleware')  // 인가

const todoController = require('../controllers/todo.controller')  // 컨트롤러 갖고옴(다음 플로우를 불러옴)


// 할 일 생성 API(jwt인증 필)
router.post('/todos',
  authenticateToken,
  createTodoValidator,
  handleValidationResult, // validator 부른 후 -> 결과 검사처리기
  todoController.createTodo)

// 할 일 목록 조회 API
router.get('/todos',
  getTodoValidator,
  handleValidationResult, // validator 부른 후 -> 결과 검사처리기
  checkPostOwner,
  todoController.getTodos
)

module.exports = router;