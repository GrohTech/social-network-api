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

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({
                                message: 'No user found with this id!'
                            })
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => {
                        res.json(err);
                    })
            });
    },

    // PUT to update a thought by its _id



    // DELETE to remove a thought by its _id


    // /api/thoughts/:thoughtId/reactions

    // POST to create a reaction stored in a single thought's reactions array field

    // DELETE to pull and remove a reaction by the reaction's reactionId value


};

module.exports = thoughtController;

