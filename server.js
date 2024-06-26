require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')

//express app
const app=express();

//midddleware
app.use(express.json())

app.use(cors(
    {
        origin:'*', // allow accept request from any origin
        // origin:"http://localhost:3000",     // allow only accept request came from local machine
        // origin:"https://mern-app-1-frontend-rose.vercel.app", // allow only accept request came from our deployed app
        method:["GET","POST","DELETE","PATCH"],
        credentials:true
    }
))

app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)


//connent to mongo DB
mongoose.connect(process.env.MONGO_URI).then(()=>{

    console.log("Connected to DB")
    //listen for requests
    app.listen(process.env.PORT, ()=>{
        console.log(`Ready to listen on port : ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(error)
})

