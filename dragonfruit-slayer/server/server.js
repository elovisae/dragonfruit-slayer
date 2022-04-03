const express       = require('express')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const Item          = require('./modules/Item')
const User          = require('./modules/User')
const jwt           = require('jsonwebtoken')

const app           = express()
app.use(cors())
app.use(bodyParser.json())

// ************** HTTP methods for ITEMS *********************

//Get list of all items
app.get('/items', async (req, res) => {
    Item.find()
        .then(data => {
            res.json(data)
        })
        .catch(error => console.log(error))
})

// Get specific item (för enskilda varor sidor)
app.get('/items/:itemId', async (req, res) => {
    Item.findById(req.params.itemId)
        .then(data => {
            res.send(data)
        })
        .catch(error => console.log(error))
})

app.post('/items', (req, res) => {
    const item = new Item(req.body);

    item.save()
        .then(result => {
            res.send('Item added')
            res.send(result);
            console.log('Item added')
        })
        .catch(error => console.log(error))
})

// Update specific item
    // This will not be used on the website, but we might use it if we need to change something
app.patch('/items/:itemId', async (req, res) => {
    Item.updateOne({_id: req.params.itemId},
        {$set: {
            productName: req.body.productName,
            producer:req.body.producer,
            bio: req.body.bio,
            prize: req.body.prize,
            size:req.body.size,
            image: req.body.image,
            tags: req.body.tags,
            quantity: req.body.quantity,
            isInCart: req.body.isInCart
            }
        })
        .then(data => {
            console.log('Item patced')
            res.json({message: 'item patched'})
        })
        .catch(error => console.log(error))
})

//Delete specific item
    //This will not be used on the website, but we might use it if we want to delete an item
app.delete('/items/:itemId', async (req, res) => {
    Item.deleteOne({_id: req.params.itemId})
        .then(result => {
            res.send("Item deleted");
            console.log('Item deleted')
        })
})


// ************** HTTP methods for USERS *********************

//Create new user
app.post('/users/register', async(req,res)=> {
    const newUser = new User({
        name: req.body.name,
         email: req.body.email,
         password: req.body.password
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch(err){
        res.status(500).json(err)
    }
})

//User login request
app.post('/users/login', async (req,res) => {
    
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if(user) {

     const token = jwt.sign(
         {
          name: user.name,
          email: user.email,
         }, 'secret123')

        return res.json({ status: 'ok', user: token})
    } else {
        return res.json({ status: 'error', user: false})
    }
     
})
app.get('/users/purchases', async (req,res) => {
     const token = req.headers['x-access-token']

     //checking if token is correct or not)
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({email:email})

        return res.json({ status: 'ok', purchases: user.purchases})
    } catch(error) {
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
     
})

//Add purchase(s) to user

app.post('/users/purchases', async (req,res) => {
     const token = req.headers['x-access-token']

    
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email

        await User.updateOne(
            {email:email}, 
            {$set: { purchases:req.body.purchases}}
        )

        return { status: 'ok'}
    } catch(error) {
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
     
})


// Get list of all users
    // This will not be used on the website, but is good for us to have to check all existing users (via ex insomnia)
/*app.get('/users', async (req, res) => {
    User.find()
        .then(data => {
            res.send(data)
        })
        .catch(error => console.log(error))
})*/

// Delete user (if we need to delete some of our tests)
app.delete('/users/:userId', async (req, res) => {
    User.deleteOne({_id: req.params.userId})
        .then(data => {
            res.send('User deleted');
            console.log('User deleted')
        })
})



//MongoDB connection
mongoose.connect(
    'mongodb+srv://user:12345@cluster0.i297s.mongodb.net/dragonfruit?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)


//Server runs on localhost:5000
app.listen(5000, () => {
    console.log('Listening to port 5000')
})