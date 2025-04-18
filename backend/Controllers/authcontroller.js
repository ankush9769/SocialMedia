import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const registration = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) return res.status(400).json({ msg: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = new User({ username, email, password:hashedpassword })
        await newuser.save();

        res.status(201).json({ msg: "User registraion successfully",newuser });
    }
    catch (err) {
        res.status(500).json({ msg: "Error in registration", err });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) res.status(400).json({ msg: "user not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // false for localhost
            sameSite: 'Lax',
            maxAge: 3600000
        })
        res .status(200).json({ msg: "Login successfully",user:{username:user.username,email:user.email} });
    }
    catch(err){
        console.log(err)
        res.status(500).json({ err , msg: "Error in login"});
    }
}
