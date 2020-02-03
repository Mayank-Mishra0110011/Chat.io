const express = require('express');
const router = express.Router();
const server = require('../models/Server');
const channel = require('../models/Channel');
const passport = require('passport');
const validator = require('validator');

//@route POST channel/create
//@desc create channel
//@access Private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {serverID, channelName, channelType} = req.body;
    if (!serverID) res.status(400).json({channel: 'Server ID is required'});
    if (!channelName || channelName.trim() == '') res.status(400).json({channel: 'Channel Name is required'});
    if (!validator.isLength(channelName, { min: 4, max: 64 }))  return res.status(400).json({server: 'Channel name must be between 4 to 64 characters'});
    if (!channelType || channelType.trim() == '') res.status(400).json({channel: 'Channel Type is required'});
    if (channelType != 'text' ||channelType != 'audio'||channelType != 'video') res.status(400).json({channel: 'Invalid Channel type'});
    server.findById(serverID).then(foundServer => {
        const newChannel = new Channel({
            name: channelName,
            type: channelType        
        });
        newChannel.save().then((chn) => {
            foundServer.channels.push(newChannel);
            foundServer.save().then((ser) => {
                res.json(chn, ser)
            })
        });
    }).catch(() => {
        res.status(400).json({channel: 'Server Not Found'});
    })    
});

module.exports = router;