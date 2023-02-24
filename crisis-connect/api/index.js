import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import User from './models/User.js'
import jwt from 'jsonwebtoken'


/* CONFIGS */


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.post('/Register', async (req,res) => {
        const {username,password} = req.body;
        try{
          const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
          });
          res.json(userDoc);
        } catch(e) {
          console.log(e);
          res.status(400).json(e);
        }
      });

      app.post('/Login', async (req,res) => {
        const {username,password} = req.body;
        const userDoc = await User.findOne({username});
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
          // logged in
          jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
              id:userDoc._id,
              username,
            });
          });
        } else {
          res.status(400).json('wrong credentials');
        }
      });








    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));



  
  })
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb+srv://crisisconnect:Qfs7COKEY4XIG5kt@cluster0.hdxhacq.mongodb.net/?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }, () => {
//     console.log('Connected to MongoDB');
//   })






