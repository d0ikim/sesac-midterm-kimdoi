const prisma = require('../utils/prisma')

class TodoRepository {
  async createTodo(title,description){
    return await prisma.post.create({
      data: {
        title,
        description
      }
    });
  }

 
  async getTodos(){
    return await prisma.post.findUnique({
      where : { postId : +postId },
        include : { // join 연산
          User: {
            select: {
              userId: true,
              nickname: true
            }
          }
        },
    })
  }
}

module.exports = new TodoRepository();