const Router = require("express").Router;
const postRouter = Router();

const {getAll, tweet, like} = require("../controller/postController");

postRouter.get("/listall", async (req, res) => {
    const result = await getAll();
    res.json(result);
});

postRouter.post("/tweet", async (req, res) => {
    const { token, title, content } = req.body;
    const result = await tweet(token, title, content);
    res.json(result);
})

postRouter.post("/like", async (req, res) => {
    const { token, postId } = req.body;
    const result = await like(token, postId);
    res.json(result);
})

module.exports = postRouter;