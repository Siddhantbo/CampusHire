import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { token as generateToken } from "../Configs/JwtToken.js";

// Account creation function
const userRegister = async (req, res) => {
  const { firstName, lastName, email, password, role = "Students" } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to create an account" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please log in instead." });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role, // Default is "Students" unless specified as "Admins"
    });

    await newUser.save();
    res.status(201).json({
      message: `Account created successfully as ${role}`,
      user: { firstName, lastName, email, role },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login function
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials. Check your email or password." });
    }

    // Generate JWT token
    const token = await generateToken(user);
    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token,
      userid: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { userRegister, userLogin };
