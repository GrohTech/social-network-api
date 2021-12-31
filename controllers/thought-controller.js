const { Thought, User } = require('../models');

const thoughtController = {

    // /api/thoughts

    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET a single thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No thought found with this id!'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // POST to create a new thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true })
                })
                .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({
                                message: 'No user found with this id!'
                            });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => {
                        res.json(err);
                    })
    },

    // PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({
                    message: 'No thought found with this id!'
                });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // DELETE to remove a thought by its _id
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });        
    },

    // /api/thoughts/:thoughtId/reactions

    // POST to create a reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { runValidators: true, new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({
                    message: 'No thought found with this id!'
                });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });             
    },


    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });          
    }
};

module.exports = thoughtController;

