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
        User.find({active:true},(err, users) => {
            if (err) throw err;
            res.json(users);
        });
    },
    update: (req, res) => {
        let pId = req.params.id;
        let password = req.body.password;

        User.findOne({_id: pId}, (err,user) => {
            if (err) throw err;

            user.password = password;

            user.save((err, newUser) => {
                if (err) throw err;

                res.json(newUser);
            });

        });
    },
    delete: (req, res) => {

        console.log('delete user' + req.params.id);
        let id = req.params.id;

        User.findOne({_id: id}, (err, u) => {
            if (err) throw err;

            u.active = false;

            u.save((err, user) => {
                if (err) throw err;

                res.json(user);
            });
        });

    }
};