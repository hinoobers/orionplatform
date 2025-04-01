const Router = require("express").Router;
const postRouter = Router();

const {getAll} = require("../controller/postController");

postRouter.get("/listall", async (req, res) => {
    const result = await getAll();
    res.json(result);
});

module.exports = postRouter;