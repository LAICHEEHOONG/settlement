//create password

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 3;
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const jwtSecret = process.env.JWT_SECRET;

const passwordSchema = mongoose.Schema({
    password: {
        type: String,
        trim: true
    }
})


//save 之前加密密码
passwordSchema.pre('save', function(next) {
    // let password = this;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
            console.log({
                erros:err,
                message: 'bcrypt genSalt error'
            });
            next();
        };

        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) {
                console.log({
                    erros:err,
                    message: 'bcrypt genSalt error'
                });
                next();
            };

            this.password = hash;

            next();
        })

    })

})

//验证 登入密码 与 加密密码
passwordSchema.method('comparePassword', function(password, cb) {
    // console.log(this)
    bcrypt.compare(password, this.password, (err, result) => {
        if(err) {
            const errMessage = {
                message: 'bcrypt compare error',
                error: err
            }
            console.log(errMessage);
            cb(err);
            return;
        }
        cb(null, result);
    })
})

//生成 token
passwordSchema.method('generateToken', function() {
    let token = jwt.sign(this._id.toString(), jwtSecret);

    return token;
})


const Password = mongoose.model('Password', passwordSchema);

module.exports = { Password };