import express from 'express';
import cors from 'cors';
import {adminRouter} from './addmin.js';

const app = express();
const port = 2000;

app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}));
app.use(express.json());

app.use('/auth', adminRouter);




app.listen(port,() =>{
    console.log(`The application Runing on port ${port}`)
})