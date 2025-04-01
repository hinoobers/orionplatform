const Router = require("express").Router;
const userRouter = Router();

const {login, register, verifyToken} = require("../controller/authenticationController");

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
});

module.exports = userRouter;