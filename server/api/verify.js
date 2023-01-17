const express = require('express');
let router = express.Router();
// const {Password} = require('../models/password_model');
// const jwt = require('jsonwebtoken');
// const jwtSecret = 'lailailai';

const { checkToken} = require('../middleware/auth_middleware');

router.route('/')
.get(checkToken, (req, res) => {
    console.log('check token activate');
    // res.json({message: 'check token activate'})
})

// router.route('/') 
// .get(async(req, res) => {
//     try {
//         const dbPassword = await Password.findOne();
//         const id = dbPassword._id.toString();
//         let token = req.cookies.token;

//         if(token) {
//             const decoded = jwt.verify(token, jwtSecret);
//             if(decoded === id) {
//                 res.json({login: true})
//             } else {
//                 res.json({login: false})
//             }
//         } else {
//             res.json({login: false});
//         }
  
//     } catch(err) {
//         let message = {
//             errors: err
//         }

//         console.log(message);
//         res.json(message);
//     }
// })


module.exports = router;

