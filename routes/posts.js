const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/auth");

// View posts

router.get("/", auth, (req, res) => {
    res.json({
        message: "Posts router",
    });
});

module.exports = router;
