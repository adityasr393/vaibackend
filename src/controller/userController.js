// const usersModels = require('../schema/userSchema');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
const bcrypt = require("bcrypt"); // bcrypt Module Import
const saltRounds = 10; // Number of Salt rounds used in Encryption of the password
const UsersModel = require("../schema/signupschema"); // Schema created for the Users
const jwt = require('jsonwebtoken');





exports.signup = async (req, res) => {
    const username = req.body.username;
    const userData = await UsersModel.findOne({ username: username });
    if (!userData) {
        const salt = await bcrypt.genSalt(saltRounds);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        UsersModel.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.json(err));
    }
    else {
        res.json("Username Unavailable");
    }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password} = req.body;
        const userData = await UsersModel.findOne({ username: username });
        if (userData) {
            const match = await bcrypt.compare(password, userData.password);
            if (match) {
                const token = await jwt.sign({ userId: userData._id }, 'knauezebdgbuviuegyberjdbvfiuarwjp0232823y8732fui2gu2q', { expiresIn: "1h" });
                res.json({ message: "Success", data: userData, token: token });
            } else {
                console.log(match);
                res.json("Username or password is incorrect");
            }
        } else {
            res.json("User not found");
        }
    } catch (err) {
        console.log(err);
    }
};
exports.getprof = async (req, res) => {
    try {
        let data = await UsersModel.findById(req.params.id);
        res.json(data)
    } catch (err) {
        console.log(err)
    }
};
exports.updateprof = async (req, res) => {
    try {
        const data = await UsersModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
};
exports.getsignup = async (req, res) => {
    try {
     
        let contactData = await UsersModel.find()

        res.json(contactData);
    } catch (error) {
        console.log(error);
        if (!error.status) {
            error.status = 500;
        }

        res.status(error.status).json({ message: error.message });
    }
};

exports.updatestatus = async (req, res) => {
    try {
        const data = await UsersModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.json(data);
    } catch (err) {
        console.log(err);
    }
};
