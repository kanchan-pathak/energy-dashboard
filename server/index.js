import express from 'express'
import cors from 'cors'
const app=express();

app.use(cors({
  origin: "https://legendary-dollop-v7p7vv6gq5cw6wj-5173.app.github.dev",
  credentials: true
}));

app.get('/',(req,res)=>{
  res.send("server is ready")
})

app.get('/api/v1/jokes',(req,res)=>{
const jokes=[
  {
    id:1,
    title:'Joke 1',
    content: 'This is a joke'
  },
  {
    id:2,
    title:'Joke 2',
    content: 'This is 2nd joke'
  },
  {
    id:3,
    title:'Joke 3',
    content: 'This is 3rd joke'
  }
]
res.send(jokes)
})

const port= process.env.PORT ||3000

app.listen(port,()=>{
  console.log(`Server is ready at port ${port}`)
})