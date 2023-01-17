const { Password } = require('../models/password_model');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.checkToken = async (req, res, next) => {
    try {
        const dbPassword = await Password.findOne();
        if (req.cookies.token) {
            const token = req.cookies.token;
            const decoded = jwt.verify(token, jwtSecret);
            const passwordId = dbPassword._id.toString();
            if (passwordId === decoded) {
                console.log({ login: true });
                res.json({ login: true });
            } else {
                console.log({ login: false })
                res.json({ login: false })
            }
        } else {
            console.log({ login: false })
            res.json({login: false})
        }

        next();


    } catch (err) {
        console.log(err);
        res.json({ login: false });        
        next();
    }
}

exports.checkToken2 = async (req, res, next) => {
    try {
        const dbPassword = await Password.findOne();
        if (req.cookies.token) {
            const token = req.cookies.token;
            const decoded = jwt.verify(token, jwtSecret);
            const passwordId = dbPassword._id.toString();
            if (passwordId === decoded) {
                // console.log({ login: true });
                next()
                // res.json({ login: true });
            } else {
                // console.log({ login: false })
                res.json({ login: false })
            }
        } else {
            // console.log({ login: false })
            res.json({login: false})
        }

        // next();


    } catch (err) {
        console.log(err);
        res.json({ login: false });        
        // next();
    }
}

