const express = require('express');
let router = express.Router();

const { checkToken2 } = require('../middleware/auth_middleware');
const { Settlement } = require('../models/cash_model');

router.route('/')
    .get(checkToken2,async (req, res) => {
        try {
            const settlementData = await Settlement.findOne();
            const cash_arr = settlementData.cashArr;
            const findZero = cash_arr.find(el => el === 0);

            if (findZero === 0) {
                const noZeroArr = cash_arr.filter(el => el !== 0);
                const updateCashArr = await Settlement.updateOne({}, {'$set': { 'cashArr': noZeroArr }})
                const settlementDataNonZero = await Settlement.findOne();

                res.json(settlementDataNonZero);

            } else {
                res.json(settlementData);
            }


            // const dbPassword = await Password.findOne();
        } catch (err) {
            console.log(err);
            res.json({ errors: err });
        }
    })
    .post(async (req, res) => {
        try {
            const systemAmount = req.body.systemAmount;
            const startAmount = req.body.startAmount;
            const cashArr = req.body.cashArr;

            let allAmount = new Settlement({
                systemAmount,
                startAmount,
                cashArr
            })

            await allAmount.save();


            res.json({ message: 'save' });



        } catch (err) {
            console.log(err);
            res.json({ errors: err });
        }


    })
    .patch(async (req, res) => {
        try {
            const cash = req.body.cash;
            let pushCash = await Settlement.updateOne({}, { '$push': { 'cashArr': cash } })
            let cashData = await Settlement.findOne({});
            let cashArr = cashData.cashArr;
            console.log(cashArr);
            res.json(cashArr);
        } catch (err) {
            console.log(err);
            res.json({ errors: err });
        }
    })

router.route('/change-cash')
    .patch(async (req, res) => {
        try {
            const v = req.body.v;
            const i = req.body.i;
            const allData = await Settlement.findOne({});
            const cashArr = allData.cashArr;

            cashArr[i] = v;

            let updateChange = await Settlement.updateOne({}, { '$set': { 'cashArr': cashArr } });

            res.json({ cashArr });

            // if(v !== '0') {
            //     cashArr[i] = v;

            //     let updateChange = await Settlement.updateOne({}, {'$set': {'cashArr': cashArr}});

            //     res.json({cashArr});
            // } else {
            //     let spliceCash = cashArr.splice(i, 1);
            //     let updateChange = await Settlement.updateOne({}, {'$set': {'cashArr': cashArr}});
            //     console.log(cashArr);
            //     res.json({cashArr});
            // }

        } catch (err) {
            console.log(err);
            res.json({ errors: err });
        }

    })

router.route('/startAmount')
    .patch(async (req, res) => {
        try {
            const startAmount = req.body.startAmount;
            let updateStartAmount = await Settlement.updateOne({}, { '$set': { 'startAmount': startAmount } });

            res.json({ startAmount })
        } catch (err) {
            console.log(err);
            res.json({ errors: err });
        }
    })

router.route('/systemAmount')
    .patch(async (req, res) => {
        try {
            const systemAmount = req.body.systemAmount;
            let updatesystemAmount = await Settlement.updateOne({}, { '$set': { 'systemAmount': systemAmount } });

            res.json({ systemAmount })
        } catch (err) {
            console.log(err);
            res.json({ errors: err });
        }
    })

router.route('/reset')
    .get(async (req, res) => {
        try {
            let resetAmount = await Settlement.updateOne({'systemAmount': 0, 'startAmount': 0, 'cashArr': []});
            let settlementData = await Settlement.findOne({});
            
            res.json(settlementData);
        } catch(err) {
            console.log(err);
            res.json({errors: err});
        }
    })    


// router.route('/add-cash')
//     .post(async(req, res) => {
//         try {
//             const newCash = req.body.cash;
//             let 

//         } catch(err) {
//             console.log(err);
//             res.json({errors: err});
//         }
//     })

module.exports = router;



const arr = [1, 0, 2, 0, 3];

let arrFilter = arr.filter(el => el !== 0);

console.log(arr, arrFilter)







