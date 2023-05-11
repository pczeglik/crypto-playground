import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { hash } from "./utils/util-crypto.js";

console.log(hash("hello world"));

type User = {
  email: string;
  password: string;
};

const users: User[] = [];

function signup(email: string, pass: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(pass, salt, 64);

  const user: User = {
    email,
    password: `${salt}:${hashedPassword.toString("hex")}`,
  };

  users.push(user);
  return user;
}

function login(email: string, password: string) {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  const [salt, pass] = user.password.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);

  const keyBuffer = Buffer.from(pass, "hex");
  const match = timingSafeEqual(keyBuffer, hashedBuffer);

  if (!match) {
    throw new Error("Invalid password");
  }

  console.log(`Welcome ${email}, you are logged in`);
}

const testUser: User = {
  email: "hello@test.com",
  password: "hello world",
};

console.log(signup(testUser.email, testUser.password));

try {
  login(testUser.email, "hello world");
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else if (typeof error === "string") {
    console.log(error);
  }
}
