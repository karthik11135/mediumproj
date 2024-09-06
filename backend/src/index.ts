import { Hono } from 'hono'
import blog from './routes/blogRoutes'
import user from './routes/userRoutes'

const app = new Hono()

app.route('/api/v1/user', user)
app.route('/api/v1/blog', blog)


export default app
