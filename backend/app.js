const express = require("express");
const userRouter = require("./routers/user.router");
const todoRouter = require("./routers/todo.router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", todoRouter)
app.use("/auth", userRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});