import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { URI, port } from './config.mjs';
import router from './src/routes/route.mjs';



const app = express();
app.use(express.json());
// Enable CORS for frontend (Netlify + localhost)
const allowedOrigins = [
    'https://noteskills.netlify.app',
    'http://localhost:5173'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin like mobile apps or curl
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
// Preflight will be handled automatically by cors middleware

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

