const jwt = require("jsonwebtoken");

// Authentication middleware

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_ACCES_TOKEN_KEY, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: "forbidden" });
            }
            req.id = payload.id;
            next();
        });
    } else {
        res.status(401).json({ message: "token missing" });
    }
}

module.exports = { auth };
