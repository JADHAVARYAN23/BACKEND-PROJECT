import dotenv from "dotenv";

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||2000,()=>{
        console.log(`server is running at ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo db connection is failed",err)
})

// import express from "express"
// const app=express()
// (async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//        app.on("error",()=>{
//         console.log("ERROR",error)
//         throw err
//        })

//        app .listen(process.env.PORT,()=>{
//         console.log(`App is listing on ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.log("ERROR",error)
//         throw err
//     }
// })()