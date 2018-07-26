const express = require('express'),
    app = express(),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    engines = require('consolidate');
mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/SearchApp');
var db = mongoose.connection;

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

var routes = require('./route');
app.use('/', routes);

// *************** Users *******************************

// app.get('/data', function (req, res) {
//     User.find(function (err, result) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.json(result);
//         }
//     })
// })

// app.get('/data/:id', function (req, res) {
//     User.find({ _id: req.params.id }, function (err, result) {
//         if (err) {
//             return res.send({ msg: err });
//         }
//         res.send({ user: result });
//     })
// })

// app.post('/data', function (req, res) {

//     var newUser = new User();
//     newUser.Username = req.body.Username;
//     newUser.Email = req.body.Email;
//     newUser.Password = req.body.Password;

//     newUser.save(function (err, result) {
//         console.log('savedData', res)
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.json(result);
//         }
//     })
// })

// app.delete('/data/:id', function (req, res) {
//     var query = req.params._id;
//     User.remove(query, function (err, result) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.json(result);
//         }
//     })
// })

// app.put('/data/:id', function (req, res) {
//     var query = req.params._id;
//     User.findOneAndUpdate(query, function (err, result) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.json(result);
//         }
//     })
// })

// *************** Profile *******************************

var Profile = require('./models/profileRegister');

app.get('/profile', function (req, res) {
    Profile.find(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
})

app.get('/profile/:id', function (req, res) {
    User.find({ _id: req.params.id }, function (err, result) {
        if (err) {
            return res.send({ err });
        }
        res.json(result);
    })
})

app.post('/profile', function (req, res) {

    var newUser = new Profile();
    newUser.FullName = req.body.FullName;
    newUser.Fathers_Name = req.body.Fathers_Name;
    newUser.Age = req.body.Age;
    newUser.Address = req.body.Address;
    newUser.Occupation = req.body.Occupation;
    newUser.Marital_Status = req.body.Marital_Status;

    newUser.save(function (err, result) {
        console.log('res', res)
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
})

app.delete('/profile/:id', function (req, res) {
    var query = req.params._id;
    Profile.remove(query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
})

app.put('/profile/:id', function (req, res) {
    var query = req.params._id;
    Profile.findOneAndUpdate(query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
})

//*********** Login *********************

// app.post('/login', function (req, res) {
//     User.find({ Username: req.body.Username }, function (err, user) {
//         if (user === null) {
//             res.end("Please enter details");
//         }
//         else if (user[0].Username === req.body.Username && user[0].Password === req.body.Password) {
//             // res.render('index');
//             console.log('logged in ')
//         }
//         else if (!user) {
//             console.log('login');
//         }
//         else if (err) {
//             res.end("Login invalid");
//         }
//         else {
//             console.log("else");
//         }
//     });
// });

// Start the server
app.listen(5000);
console.log('Your server is running on port 5000.');