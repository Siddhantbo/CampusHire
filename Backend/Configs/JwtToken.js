import jwt from "jsonwebtoken";

// Creating user JWT token
const token = async (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Creating admin JWT token
const adminToken = async (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: "admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

export { token, adminToken };
