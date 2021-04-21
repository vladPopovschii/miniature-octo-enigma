const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const { upload } = require("../configs/uploadImage");

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ users });
    } catch (error) {
        console.error(error);
    }
});

// Endpoint for viewing user

router.get("/user", async (req, res) => {
    const id = req.id;
    try {
        const user = await User.findById(id);
        res.json({ user: user });
    } catch (error) {
        console.error(error);
    }
});

// Endpoint for changind username

router.post("/edit", async (req, res) => {
    const { username } = req.body;
    const id = req.id;
    try {
    } catch (error) {}
    const user = await User.findByIdAndUpdate(
        id,
        {
            username,
        },
        {
            new: true,
        }
    );
    if (!user) return res.json({ error: "User not found" });
    res.json({
        message: "Username changed",
        user: user,
    });
});

// Endpoint for uploading user avatar

router.post(
    "/edit-profile-image",
    upload.single("avatar"),
    async (req, res) => {
        const id = req.id;
        try {
            const user = await User.findByIdAndUpdate(
                id,
                {
                    profileImage: req.file.filename,
                },
                {
                    new: true,
                }
            );
            res.json({
                user,
                message: "Image updated",
            });
        } catch (error) {
            console.error(error);
        }
    }
);

module.exports = router;
