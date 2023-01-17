const mongoose = require('mongoose');

const cashSchema = mongoose.Schema({
    systemAmount: {
        type: Number,
        default: 0
    },
    startAmount: {
        type: Number,
        default: 0
    },
    cashArr: [{
        type: Number,
        default: 0
    }]
});

const Settlement = mongoose.model('Settlement', cashSchema);

module.exports = {Settlement};
