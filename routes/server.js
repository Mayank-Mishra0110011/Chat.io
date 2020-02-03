const express = require('express');
const router = express.Router();
const server = require('../models/Server');
const channel = require('../models/Channel');
const passport = require('passport');
const validator = require('validator');

//@route POST server/create
//@desc create server
//@access Private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.body.serverName) return res.status(400).json({server: 'Server name is required'});
    if (req.body.serverName.trim() == '') return res.status(400).json({server: 'Server name is required'});
    if (!validator.isLength(req.body.serverName, { min: 4, max: 64 }))  return res.status(400).json({server: 'Server name must be between 4 to 64 characters'});
    let image;
    if (req.body.image) image = req.body.image;
    const newServer = new Server({
        name: req.body.serverName,
        image: image
    });
    const channel1 = new Channel({
        type: 'text',
        name: 'general' 
    });
    const channel2 = new Channel({
        type: 'audio',
        name: 'general' 
    });
    const channel3 = new Channel({
        type: 'video',
        name: 'general' 
    });
    newServer.admins.push(req.user.id);
    newServer.members.push(req.user.id);
    newServer.channels.push(channel1);
    newServer.channels.push(channel2);
    newServer.channels.push(channel3);

    newServer.save().then(() => {
        res.json({suceess: true, server: newServer})
    });
});

module.exports = router;