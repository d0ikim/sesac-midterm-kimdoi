const AuthService = require('../services/auth.service')

class AuthController {
  async signUp(req,res,next) {
    const { email, password, nickname } = req.body;

    const newUser = await AuthService.signUp(email, password, nickname);

    return res.status(201).json({
      userid: newUser.userId
    }) 
  }

  async login(req,res,next){
    const { email, password } = req.body;
    const token = await AuthService.login(email,password);
    
    return res.status(200).send(token)
  }
      
}

module.exports = new AuthController();