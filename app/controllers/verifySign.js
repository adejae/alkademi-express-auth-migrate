const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = require('../models').User;
const Role = require('../models').Role;
const Op = db.Sequelize.Op;
const config = require('../config/configRoles');

module.exports = {
    signup(req, res) {
        return User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        .then(user => {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(200).send({
                        auth: true, 
                        message: "User registered successfully!",
                        errors: null
                    });
                });
            })
            .catch(err => {
                res.status(500).send({
                    auth: false,
                    message: "Error",
                    errors: err
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                auth: false,
                nama: req.body.name,
                message: "Error",
                errors: err
            });
        })
    },

    signIn(req, res) {
        return User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    auth: false,
                    accessToken: null,
                    message: "Error",
                    errors: "User Not Found."
                })
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    accessToken: null,
                    message: "Error",
                    errors: "Invalid Password!"
                });
            }
            
            console.log('>> config.secret', config.secret);
            console.log('>> user.id', user.id);
            const jwtToken = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});
            var token = `Bearer ${jwtToken}`;
            console.log('>> token is ', token);

            res.status(200).send({
                auth: true,
                accessToken: token,
                message: "success",
                errors: null
            });
        })
        .catch(err => {
            console.log('>> ERR', err);
            res.status(500).send({
                auth: false,
                accessToken: null,
                message: "Error",
                errors: err
            });
        })
    }
}