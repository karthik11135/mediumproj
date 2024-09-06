import { Hono } from "hono";

const blog = new Hono();

blog.post("/", (c) => {
  return c.text("hey there");
});

blog.put("/", (c) => {
    return c.text("hey there")
})

blog.get("/:id", (c) =>{
    return c.text("hi")
})

blog.get('/bulk', (c, next) => {
    return c.text("hi")
})

export default blog;
