const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/", (req, res) => {
    res.send("Register Page");
});

// Endpoint for registering users

router.post("/", async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    try {
        if (await User.findOne({ email }))
            return res.json({ message: "User with that email already exists" });
        if (password.length < 8)
            return res.json({
                message: "Password must contain at least 8 characters",
            });
        if (password !== confirmPassword)
            return res.json({ message: "Passwords must match" });

        const user = new User({
            email,
            username,
            password,
        });
        await user.save();
        res.json({ message: "User registered succesfuly" });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
