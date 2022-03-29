const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;

const itemSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    bio: { 
        type: String,
        required: true
    },
    prize: {
        type: String,
        required: true
    },
    img_link: {
        type: String,
        required: true
    },
    tags: { //samla dofter etc för att kunna filtrera?
        type: Array,
        required: false
    }
});

const Item  = mongoose.model('Item', itemSchema);
module.exports = Item;