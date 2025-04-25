const Router = require("express").Router;
const userRouter = Router();

const {login, register, verifyToken} = require("../controller/authenticationController");

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
});

userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const result = await register(username, email, password)
    res.json(result)
})

userRouter.post("/validatetoken", async (req, res) => {
    const { token } = req.body;
    const result = await verifyToken(token);
    res.json(result);
});

module.exports = userRouter;