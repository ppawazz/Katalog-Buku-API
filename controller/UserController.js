const User = require("../models/UserModels");
const bcrypt = require('bcrypt')

const userRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // Create a new user with hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the provided password matches the user's password
      if (password === user.password) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json({
          success: true,
          payload: users,
          message: "successfully getting user"
        }); 
      } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
      }
}

module.exports = {
    userRegister, userLogin, getAllUser
}