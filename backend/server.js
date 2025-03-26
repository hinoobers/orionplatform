const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routers/userRoutes");

app.use(express.json());
app.use("/user", userRouter);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});