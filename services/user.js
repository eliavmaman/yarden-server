const User = require('../models/user');


module.exports = {
    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({email: email, password: password}, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({message: 'user not found'});
            }
            console.log(user.fname, 'connected to the store');
            return res.json(user);
        });
    },
    register: (req, res) => {
        let user = req.body;
        console.log('user-----' + JSON.stringify(user));
        let u = new User(user);
        u.save((err, user) => {
            if (err) throw err;
            console.log(user.fname, 'register to the store');
            return res.json(user);
        });
    },
    list: (req, res) => {
        User.find((err, users) => {
            if (err) throw err;
            res.json(users);
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let password = req.body;

        User.findOne({_id: pId}, (err,) => {
            if (err) throw err;

            p.password = password;

            p.save((err, newUser) => {
                if (err) throw err;

                res.json(newUser);
            });

        });
    }
};