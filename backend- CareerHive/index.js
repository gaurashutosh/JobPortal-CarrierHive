import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"


dotenv.config({});


const app = express();

//middleware

app.use(express.json()); // used to send file to server in json format
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());// for storing the cookie into the browser

//for testing the connection
app.get('/home',(req,res)=>{
    return res.status(200).json({
        message:"I am coming from the server",
        success : true
    })
})

const corsOptions ={
    origin: "http//localhost:5137",
    credentials: true
}

app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

//-------------APIs--------------
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);




app.listen(PORT,()=>{
    connectDB();
    console.log(`The server is running at port ${PORT}`);
});


// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"