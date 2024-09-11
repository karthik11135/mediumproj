import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { newPostInput, updatePostInput } from "@karthikrk11135/common-app";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blog.use(async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  console.log(token);
  if (!token) {
    c.status(401);
    return c.text("wrong");
  }
  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    if (!decoded) {
      c.status(400);
      return c.json({ message: "Wrong inputs" });
    }

    c.set("userId", decoded.userId as string);
    await next();
  } catch (err) {
    c.status(400);
    return c.json({ message: "Couldn't decode the token" });
  }
});

blog.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(blogs);
  } catch (err) {
    c.status(400);
    return c.json({ message: "Somethign went wrong" });
  }
});


blog.post("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  const blogDetails = {
    title: body.title,
    content: body.content,
  };
  console.log(blogDetails)
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

blog.get("/name", async (c) => {
  const userId = c.get("userId");
  console.log("I've reached here ere bor")
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const res = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    });
    return c.json(res);
  } catch (err) {
    c.status(401);
    c.json({ message: "something went wrong" });
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
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(blog);
  } catch (err) {
    c.status(400);
    return c.json({ message: "something went wrong" });
  }
});



export default blog;
