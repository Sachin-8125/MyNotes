import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { URI, port } from './config.mjs';
import router from './src/routes/route.mjs';



const app = express();
app.use(express.json());
// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

mongoose.connect(URI)
   .then(()=>{
        console.log("database connected successfully")
   })
    .catch((err)=>{
        console.log(err);
    })

app.use('/',router);

app.listen(port||8080,()=>{
    console.log(`server is running on port ${port}`);
});

