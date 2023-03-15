const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
app.use(express.json())
const users=[
  
]

app.get('/users',(req,res)=>{res.json(users)})
app.post('/users',async(req,res)=>{
   const hashpassword=await bcrypt.hash(req.body.password,10)

    const user={
    name:req.body.name,
    password:hashpassword
  }
  users.push(user)
  res.sendStatus(201).send()
})

app.post('/login',async(req,res)=>{
    const name=req.body.name
    const u1=users.find(user=>user.name==name)
    console.log(u1)
    if(u1 == null){
        res.status(400).send('Cannot find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('sucess')
        }
        else{
            res.send('Wrong password')
        }
        
    }
    catch(e){
        res.status(500).send()
    }

})



app.listen(4000)