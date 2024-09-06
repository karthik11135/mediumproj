import { Hono } from "hono";

const user = new Hono();

user.get("/", (c) => c.text("its workign"));

user.post("/signup", (c) => c.text("hi"));

user.post("/signin", (c) => c.text("hii"));

export default user;
