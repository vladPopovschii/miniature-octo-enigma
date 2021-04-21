const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const Token = require("../models/token");

const TOKEN_TIME = "10m";

router.get("/", (req, res) => {
    res.send("Login page");
});

// Authenticate and response with a jsonwebtoken

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.json({
                error: "User with that email does not exists",
            });
        if (!(await bcrypt.compare(password, user.password)))
            return res.json({ error: "Wrong password, try again" });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_ACCES_TOKEN_KEY,
            {
                expiresIn: TOKEN_TIME,
            }
        );
        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_TOKEN_KEY
        );
        await Token.create({
            token: refreshToken,
        });
        return res.json({ token, refreshToken });
    } catch (error) {
        console.error(error);
    }
});

// Updating token

router.post("/token", async (req, res) => {
    const { token } = req.body;

    if (!token)
        return res.status(401).json({ message: "Refresh Token Missing" });

    if (!(await Token.findOne({ token })))
        return res.status(403).json({ message: "Forbidden" });

    jwt.verify(token, process.env.JWT_REFRESH_TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Frobidden" });

        const accesToken = jwt.sign(
            { id: user.id },
            process.env.JWT_ACCES_TOKEN_KEY,
            {
                expiresIn: TOKEN_TIME,
            }
        );

        res.json({ token: accesToken });
    });
});

module.exports = router;
