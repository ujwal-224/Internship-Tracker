const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.post("/add-user", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json("User Added");
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;