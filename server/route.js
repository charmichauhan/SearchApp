var express = require('express');
var router = express.Router();
var User = require('./models/user');

// GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '../public/index.html'));
});

//POST route for updating data
router.post('/register', function (req, res, next) {

    if (req.body.Username && req.body.Password) {
        var userData = {
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password,
        }
        User.create(userData, function (error, user) {
            console.log('userPost', user)
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/dashboard');
            }
        });
    }
    else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

router.post('/login', function (req, res, next) {
    User.find({ Username: req.body.Username }, function (err, user) {
        console.log('loginPost', user)
        if (req.body.Username && req.body.Password) {
            User.authenticate(req.body.Username, req.body.Password, function (error, user) {
                if (err) {
                    var err = new Error('Error while logging in!!.');
                    err.status = 401;
                    return next(err);
                }
                else if (!user) {
                    var err = new Error('Wrong email or password.');
                    err.status = 401;
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    return res.render('/dashboard');
                }
            });
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    })
});

// GET route after registering
router.get('/dashboard', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            console.log('userGet', user)
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.Username + '<h2>Mail: </h2>' + user.Email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;