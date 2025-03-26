const Router = require("express").Router;
const userRouter = Router();

const {login, register, verifyToken} = require("../controller/authenticationController");

userRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    const result = login(email, password);
    res.json(result);
});

module.exports = userRouter;