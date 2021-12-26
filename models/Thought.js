const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now 
        get: createdAtVal => dateFormat(createdAtVal)
    },

    username: {
        type: String,
        required: 'Username is required'
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
            getters: true,
            virtuals: true
    },
    id: false
},
);
// Retrieves length of the thought's reactions
CommentSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

    
}