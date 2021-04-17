const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const uploadImage = require("../configs/uploadImage");

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.json({ users });
});

// Endpoint for viewing user

router.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.json({ user: user });
    } catch (error) {
        console.error(error);
    }
});

router.get("/edit", (req, res) => {
    res.json({ message: "Edit user route" });
});

// Endpoint for changind username

router.post("/edit", async (req, res) => {
    const { id, username } = req.body;
    try {
    } catch (error) {}
    const user = await User.findByIdAndUpdate(id, {
        username,
    });
    if (!user) return res.json({ message: "User not found" });
    res.json({
        message: "Username changed",
        user: user,
    });
});

// Endpoint for uploading user avatar

router.post("/edit-profile-image", (req, res) => {
    uploadImage.single();
});

module.exports = router;
