const express = require('express');
const router = express.Router();
const Sample = require('../models/Models');


//===================================== GET REQUEST =====================================//
router.get('/user', async (req, res) => {
    try {
        const users = await Sample.find({});
        res.status(200).json(users);
        // console.log(users.map(user => user._id.toString()));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//===================================== POST REQUEST =====================================//
router.post('/post', async (req, res) => {
    try {
        const newSample = new Sample({ name: req.body.name });
        const saved = await newSample.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//===================================== DELETE REQUEST =====================================//


//====================================== PUT REQUEST =====================================//

module.exports = router;
