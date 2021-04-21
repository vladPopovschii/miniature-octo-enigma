const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");
const Post = require("../models/post");

// View posts

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate("owner")
            .sort([["createdAt", -1]]);
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
            owner: req.id,
        });
        await post.save();
        const populatedPost = await Post.findById(post.id).populate("owner");
        res.json({
            post: populatedPost,
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
