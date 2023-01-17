const express = require('express');
let router = express.Router();

const {Password} = require('../models/password_model');

router.route('/')
    .post(async(req, res) => {
        try {
            const password = req.body.password;

            let createPassword = new Password({
                password
            })

            await createPassword.save();

            res.json({create_password: password});
        } catch(err) {
            console.log(err);
            res.json({message: err})
        }
    })


module.exports = router;