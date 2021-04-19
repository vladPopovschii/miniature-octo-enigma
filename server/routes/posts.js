const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");
const Post = require("../models/post");

// View posts

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find({});

        res.json({
            posts,
        });
    } catch (error) {
        console.error(error);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);

        res.json({ post });
    } catch (error) {
        console.error(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, content, description } = req.body;

        const post = new Post({
            title,
            content,
            description,
        });
        await post.save();
        res.json({
            post,
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
