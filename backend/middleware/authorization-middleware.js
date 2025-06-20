// 인가(Authorize) 파일
const prisma = require('../utils/prisma')

exports.checkPostOwner = async(req,res,next) =>{
  const {postId} = req.params;
  const userId = req.user;

  // userId랑 post의 userId가 동일한지 확인
  const post = await prisma.post.findUnique({
    where: { postId : +postId }
  })

  if(!post) {
    return next(new Error("PostNotFound"))
  }
  if(post.userId !== userId) {
    return next(new Error("Forbidden"))
  }
  // 게시글작성자=로그인유저 같음 확인된 상태

  res.locals.post = post; // 잠깐 넣어놓음(DB건드리는거보다 더 빨라서?)
  next(); 
}