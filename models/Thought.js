const { Schema, model, Types } = require('mongoose');

// Import dateFormat
const dateFormat = require('../utils/dateFormat');


// Child of ThoughtSchema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
}
);

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
        default: Date.now, 
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
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
},
);

// Retrieves total reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;