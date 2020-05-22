const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
