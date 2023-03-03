import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req,res) => {
        const {
            username,
            email,
            password,
        } = req.body;

        //encryption
        const salt = bcrypt.genSaltSync(10);

      
        try{
          const newUser = new User({
            username,
            email,
            password:bcrypt.hashSync(password,salt),
          });
          const savedUser = await newUser.save();
          res.status(201).json(savedUser);
        } catch(e) {
          console.log(e);
          res.status(400).json({ error: err.message });
          res.status(500).json({ error: err.message });
        }
};   


/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
      res.status(400).json('wrong credentials');
    }
  };


