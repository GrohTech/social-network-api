const { Schema, model, Types} = require('mongoose');

// Import dateFormat
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
{
    username: {
        type: String,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+@.+\..+/],

    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: {
        virtuals: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
}
);

// Retrieves total friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;