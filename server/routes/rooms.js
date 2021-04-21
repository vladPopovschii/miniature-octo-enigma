const { Router } = require("express");
const router = Router();
const Chatroom = require("../models/chatroom");

router.get("/:id", async (req, res) => {
    const receiverId = req.params.id;
    const id = req.id;

    try {
        const members = [id, receiverId];
        let room = await Chatroom.findOne({
            members: { $all: members },
        }).populate("messages");

        if (!room) {
            room = new Chatroom({
                members,
                messages: [],
            });
            await room.save();
        }

        return res.json({ room });
    } catch (error) {
        // console.log(error);
    }
});

module.exports = router;
