import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { newPostInput, updatePostInput } from "@karthikrk11135/common-app";
import z from "zod";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blog.get("/bulk", async (c) => {

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json(blogs);
  } catch (err) {
    c.status(400);
    return c.json({ message: "Somethign went wrong" });
  }
});

blog.use(async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    c.status(401);
    return c.text("wrong");
  }

  const decoded = await verify(token, c.env.JWT_SECRET);

  if (!decoded) {
    c.status(400);
    return c.json({ message: "Wrong inputs" });
  }
  console.log("lets go");
  c.set("userId", decoded.userId as string);
  await next();
});

blog.post("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  const blogDetails = {
    title: body.title,
    content: body.content,
  };

  const { success } = newPostInput.safeParse(blogDetails);

  if (!success) {
    c.status(400);
    return c.json({ message: "Couldn't safe parse" });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ message: "Blog posted" });
  } catch (err) {
    c.status(400);
    return c.json({ message: "Couldn't post" });
  }
});

blog.put("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");

  const updatedDetails = {
    title: body.title,
    content: body.content,
  };

  const { success } = updatePostInput.safeParse(updatedDetails);
  if (!success) {
    c.status(400);
    return c.json({ message: "give me correct details" });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const updateBlog = await prisma.post.update({
      where: {
        id: body.blogId,
        authorId: userId,
      },
      data: updatedDetails,
    });

    return c.json({ message: "Blog updated successfully" });
  } catch (err) {
    c.status(400);
    return c.json({ message: "Somethign went wrong" });
  }
});

blog.get("/:id", async (c) => {
  const userId = c.get("userId");
  const blogId = c.req.param("id");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
        authorId: userId,
      },
    });

    return c.json(blog);
  } catch (err) {
    c.status(400);
    return c.json({ message: "something went wrong" });
  }
});

export default blog;
