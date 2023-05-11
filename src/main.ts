import { createHash, scryptSync, randomBytes, timingSafeEqual } from "crypto";

function hash(input: string) {
  const hash = createHash("sha256").update(input).digest("hex");
  console.log(hash);
}

hash("hello world");

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

  console.log("Logged in");
}

const testUser = signup("hello@test.com", "hello world");

try {
  login(testUser.email, "hello world");
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else if (typeof error === "string") {
    console.log(error);
  }
}
