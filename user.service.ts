import repo from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

interface User {
  id: number,
  email: string,
  password: string
};

const register = async (email: string, password: string) => {
  if (!email || !password) {
    const err = new Error("Email and password are required");
    (err as any).status = 400;
    throw err;
  }

  const existingUser = await repo.findUserByEmail(email);

  if (existingUser) {
    const err = new Error("User already exists");
    (err as any).status = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repo.createUser(email, hashedPassword);

  return {
    id: user.id,
    email: user.email,
  };
};


const login = async (email: string, password: string) => {
  const user = await repo.findUserByEmail(email);

  if (!user) {
    const err = new Error("Invalid credentials");
    (err as any).status = 400;
    throw err;
  };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    (err as any).status = 400;
    throw err;
  };

  const token = jwt.sign(
    { id: user.id, email: user.email},
    process.env.JWT_SECRET as string,
    {expiresIn: "1h"}
  );

  return {
    token
  };
};

export default {
  register,
  login
};