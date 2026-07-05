const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists)
            return res.status(400).json({
                message: "User already exists",
            });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({
                message: "User not found",
            });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({
                message: "Invalid Password",
            });

        const token = jwt.sign(

{

id:user._id

},

process.env.JWT_SECRET

);

        res.json({
            success: true,
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    register,
    login,
};