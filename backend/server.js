const express=require('express');
const app=express()
const fs=require('fs')
const path=require('path')
const bodyParser=require('body-parser')
const PORT=process.env.PORT||3000
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser)



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})


app.post('/orders',(req,res)=>{
    fs.writeFile( `${req.body.userId}.txt`, JSON.stringify(req.body.item) , function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
})


app.get('/products',(req,res)=>{
    
})


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})