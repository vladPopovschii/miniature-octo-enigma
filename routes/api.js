const { Router } = require("express");
const router = Router();

// Endpoint for requesting image

router.get("/image/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(
        `/img/avatars/${filename}`,
        {
            root: "public",
        },
        (err) => {
            res.sendFile(
                "/img/default.png",
                {
                    root: "public",
                },
                (err) => {}
            );
        }
    );
});

module.exports = router;
