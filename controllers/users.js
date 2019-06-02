const User = require('../models/user');
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const Favorite = require('../models/favorite');

module.exports = {
    index,
    show,
};

function index(req, res) {
    Recipe.find({}).exec(function(err, recipes) {
        User.find({}).exec(function(err, users) {
            if (req.user) {
                User.findById(req.user._id).exec(function(err, sessionUser) {
                    res.render('users/index', { users, recipes, sessionUser });
                });
            } else {
                res.render('users/index', { users, recipes, sessionUser: null });
            };
        });
    });
}

function show(req, res, next) {
    if (req.user) {
        if (req.user._id == req.params.id) {
            User.findById(req.params.id).exec(function(err, user) {
                console.log(user)
                User.findById(req.user._id).exec(function(err, sessionUser) {
                    console.log(sessionUser)
                    Comment.find({ userId: req.user._id }).exec(function(err, comments) {
                        console.log(comments)
                        Recipe.find({}).exec(function(err, recipes) {
                            // console.log(recipes)
                            Recipe.find({ userId: req.user._id }).exec(function(err, userRecipes) {
                                console.log(userRecipes)
                                Favorite.find({ userId: req.user._id }).exec(function(err, favorites) {
                                    console.log(favorites)
                                    res.render('users/show', { comments, userRecipes, recipes, favorites, user, sessionUser });
                                });
                            });
                        });
                    });
                });
            });
        } else {
            User.findById(req.params.id).exec(function(err, user) {
                console.log(user)
                User.findById(req.user._id).exec(function(err, sessionUser) {
                    console.log(sessionUser)
                    Comment.find({ userId: req.params.id }).exec(function(err, comments) {
                        console.log(comments)
                        Recipe.find({}).exec(function(err, recipes) {
                            // console.log(recipes)
                            Recipe.find({ userId: req.params.id }).exec(function(err, userRecipes) {
                                console.log(userRecipes)
                                Favorite.find({ userId: req.params.id }).exec(function(err, favorites) {
                                    console.log(favorites)
                                    res.render('users/show', { comments, userRecipes, recipes, favorites, user, sessionUser });
                                });
                            });
                        });
                    });
                });
            });
        }
    } else {
        User.findById(req.params.id).exec(function(err, user) {
            console.log(user)
            Comment.find({ userId: req.params.id }).exec(function(err, comments) {
                console.log(comments)
                Recipe.find({}).exec(function(err, recipes) {
                    // console.log(recipes)
                    Recipe.find({ userId: req.params.id }).exec(function(err, userRecipes) {
                        console.log(userRecipes)
                        Favorite.find({ userId: req.params.id, deletedAt: null }).exec(function(err, favorites) {
                            console.log(favorites)
                            res.render('users/show', { comments, userRecipes, recipes, favorites, user, sessionUser: null });
                        });
                    });
                });
            });
        });
    }
}