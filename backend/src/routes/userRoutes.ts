import { Hono } from "hono";
// import { prisma } from "../prismaClient";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import z from "zod";
import { signinInput, signupInput } from "@karthikrk11135/common-app";
// import jwt from "jsonwebtoken";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// const userZodSchema = z.object({
//   name: z.string().optional(),
//   email: z.string().email(),
//   password: z.string(),
// });

user.get("/", async (c) => {
  return c.text("user.id");
});

user.post("/signup", async (c) => {
  const body = await c.req.json();
  const userDetails = {
    name: body.name || "",
    email: body.email,
    password: body.password,
  };

  const { success } = signupInput.safeParse(userDetails);
  if (!success) return c.json({ message: "Send correct details" });

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.env.DATABASE_URL);
  try {
    const user = await prisma.user.create({
      data: userDetails,
    });

    const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt, name: user.name });
  } catch (err) {
    console.log(err);
    return c.text("gone");
  }
});

user.post("/signin", async (c) => {
  const body = await c.req.json();
  const userDetails = {
    email: body.email,
    password: body.password,
  };
console.log(userDetails)
  const { success } = signinInput.safeParse(userDetails);

  if (!success) {
    c.status(401);
    return c.json({ message: "Bad inputs" });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(401);
      return c.json({ message: "No emails input" });
    }

    if (user.password === userDetails.password) {
      const jwt = await sign({ userId: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt, name: user.name });
    }
    c.status(400);
    return c.json({ message: "Wrong password" });
  } catch (err) {
    console.log(err);
    c.status(401);
    return c.json({ message: "Could'nt login" });
  }
  c.status(401);
  return c.json({ message: "Could'nt login" });
});

export default user;
