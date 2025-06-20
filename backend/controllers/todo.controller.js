const TodoService = require('../services/todo.service')

class TodoController {

  // 할 일 생성 API(jwt인증 필)
  async createTodo(req,res,next) {
    try {
      const { title, content } = req.body; // req.body에서 게시글의 제목, 내용, 작성자 ID를 받아옴
      const userId = req.user;

      const newPost = await TodoService.createTodo(title,content,userId);

      return res.status(201).send({
        msg: "게시글이 등록되었습니다.",
        data: newPost
      });
    } catch(e) {
      next(new Error(e));
    }
  }

  // 할 일 목록 조회 API
  async getTodos(req,res,next){
    try{
      const {postId} = req.params;

      const post = await TodoService.getTodos(postId);

      return res.status(200).json({data: post});
    } catch(e){
      next(new Error(e))
    }
  }
}

module.exports = new TodoController();