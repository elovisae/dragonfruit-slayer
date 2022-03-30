const express       = require('express')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const Item          = require('./modules/Item')
const User          = require('./modules/User')
const { getMaxListeners } = require('./modules/Item')

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
            bio: req.body.bio,
            prize: req.body.prize,
            img_link: req.body.img_link,
            tags: req.body.tags
            }
        })
        .then(data => {
            console.log('Item patced')
            res.send(data)
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
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    //Here we will need to add some validation
    user.save()
        .then(result => {
            res.send({message: "You are now registered! :)"})
            console.log('User added')
        })
        .catch(error => console.log(error))
})

//User login request
app.post('/users/login', async (req, res) => {
    let user = new User(req.body);
    User.find()
        .then(result => {
            const allUsers = result;
            allUsers.map(dbUser => {
                if (user.mail === dbUser.mail){
                    if (user.password === dbUser.password){
                        res.send({message: "Logging in", loggedIn: true})
                    }else{
                        res.send({message: "Wrong password, try again", loggedIn: false})
                    }
                }
            })
        })
        .catch(error => console.log(error))
})


// Get list of all users
    // This will not be used on the website, but is good for us to have to check all existing users (via ex insomnia)
app.get('/users', async (req, res) => {
    User.find()
        .then(data => {
            res.send(data)
        })
        .catch(error => console.log(error))
})

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