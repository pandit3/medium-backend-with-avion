import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.post('/api/v1/user/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const body= await c.req.json()
  const user= await prisma.user.create({
    // @ts-ignore
    data:{
      email: body.email,
      password:body.password
    }
  })
  console.log(user)
  if(user)return c.text("Created")
  else return c.text("Working")
})

app.post('/api/v1/user/signin',async (c)=>{
  return c.text('signin')
})

app.post('/api/v1/blog',async (c)=>{
  return c.text('blog post')
})

app.put('/api/v1/user/blog',async (c)=>{
  return c.text('blog update')
})




app.get('/api/v1/blog/:id',async (c)=>{
  return c.text('get one blog')
})

app.get('/api/v1/blog/bulk',async (c)=>{
  return c.text('get whole blog')
})

export default app
