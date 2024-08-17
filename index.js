import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', Router );


const PORT = 9000;
app.listen(PORT, ()=> console.log(`Server is running successfully on PORT ${PORT}`));


const Username = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;

Connection(Username, Password);