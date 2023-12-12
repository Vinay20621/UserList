const express=require('express')
const cors=require('cors')
require('dotenv').config();
var fs = require('fs'); 
const app=express()
app.use(cors())
const PORT=process.env.PORT
app.get('/getCountryData',(req,res)=>
{
    const token=req.query.name
    if(token!=='VinaySingh@63')
    {
        return res.json({'error':'Not Autharize'})
    }
    var data = fs.readFileSync('data.json'); 
    var elements = JSON.parse(data); 
    return res.json(elements)
})
app.listen(PORT,()=>
{
    console.log(`listing ${PORT}`)
})