const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'message'
        }
    ]
});

module.exports = Channel = mongoose.model('channel', ChannelSchema);
