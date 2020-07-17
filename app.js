const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.get('/api', (req, res) => {
    res.json({ message: "Welcome to the API"})
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            console.log(err)
            res.sendStatus(403)
        } else {
            res.json({ 
                message: "Post Created...",
                 authData
                })
            }
        })
   
    })

app.post('/api/login', (req, res) => {
    //Mock User
    const user = {
        id:1,
        username: 'Kunal',
        email: 'Kunalgautam1371@gmail.com'
    }
    jwt.sign(user, 'secretkey', (err, token) => {
        if(err) console.log(err)
        console.log(token)
        res.json({token})
    })
})

// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    //Get authHeader
    const bearerHeader = req.headers['authorization'];
    if( typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        //Set the token
        req.token = token
        next();

    } else {
        //Forbidden
        res.sendStatus(401)
    }
}

app.listen(3000, () => {
    console.log("Server started!")
})