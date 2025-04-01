const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routers/userRoutes");
const postRouter = require("./routers/postRouter");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});