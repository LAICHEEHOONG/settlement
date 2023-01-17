const express = require('express');
let router = express.Router();
const { Password } = require('../models/password_model');

router.route('/')
    .post(async (req, res) => {
        const clientPassword = req.body.password;

        try {
            const dbPassword = await Password.findOne();
            console.log(dbPassword)

            dbPassword.comparePassword(clientPassword, function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({ errors: err });
                }

                if (result) {
                    let token = dbPassword.generateToken();
                    res.cookie('token', token).json({ login: true })
                } else {
                    res.json({ login: false })
                }
            })



        } catch (err) {
            let errorMsg = {
                message: 'login failed',
                error: err
            }

            console.log(errorMsg);

            res.json(errorMsg);
        }
    })

module.exports = router;

