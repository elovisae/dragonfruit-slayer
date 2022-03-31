const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;

const itemSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    producer:{
        type: String,
        required:true
    },
    bio: { 
        type: String,
        required: true
    },
    prize: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    tags: { //samla dofter etc för att kunna filtrera?
        type: Array,
        required: false
    },
    quantity: {
        type: String,
        required: false
    },
    isInCart: {
        type: Boolean,
        required: false
    }
});

const Item  = mongoose.model('Item', itemSchema);
module.exports = Item;