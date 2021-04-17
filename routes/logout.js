const { Router } = require("express");
const router = Router();
const Token = require("../models/token");

// Deleting refresh token from database

router.delete("/", async (req, res) => {
    try {
        const { token } = req.body;

        await Token.findOneAndDelete({ token });
        res.json({ message: "Logout succesfuly" });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
