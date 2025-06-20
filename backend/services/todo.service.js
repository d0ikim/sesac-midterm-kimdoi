const TodoRepository = require('../repositories/todo.repository')

class TodoService { 

  async createTodo(title,description) {
    return await TodoRepository.createTodo(title,description);
  }
  
  async getTodos(){
    return await TodoRepository.getTodos();
  }
}

module.exports = new TodoService();