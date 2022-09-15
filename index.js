const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const arr=require("./InitialData");
const e = require('express');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/api/student",(req,res)=>{
    try{
res.json({
    status:"success",
     arr
})
    }
    catch(e){
        res.status.json(400)({
        status:"failed",
        message:e.message

    })
    }
})
app.get("/api/student/:id",(req,res)=>{
const search=arr.findIndex(obj=>obj.id==req.params.id)

    try{
if(search== -1){
res.status(400).json({
status:"failed",
meassage:"There is no such student"
})}
res.json({
    status:"succes",
    data:arr[search]
})

    }
catch(e){
    res.status(400).json({
status:"failed",
meassage:e.meassage
        
})
}
})
let idn=arr.length+1
app.post("/api/student",(req,res)=>{
    try{
      if(!req.body.name || !req.body.currentClass || !req.body.division){
        return res.status(400).json({
            status:"Failed",
            message:"not enough data"
        })
      }
      arr.push({
        id: idn,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division
    });
    idn++;
    
    res.json({
        status: "Sucess",
        id: idn
    });
    }

    catch(e){
        res.status(400).json({
            status:"failed",
            meassage:e.meassage

    })}
})

app.put("/api/student/:id",(req,res)=>{
    const search=arr.findIndex(obj=>obj.id==req.params.id)
    
        try{
    if(search== -1){
    res.status(400).json({
    status:"failed",
    meassage:"There is no such student in given id"
    })}
    if(req.body.name)
    arr[search].name = req.body.name;

if(req.body.currentClass)
    arr[search].currentClass = req.body.currentClass;

if(req.body.division)
    arr[search].division = req.body.division;
    res.json({
        status:"succes",
        data:arr[search]
    })
    
        }
        catch(e){
            res.status(400).json({
                status:"failed",
                meassage:e.meassage
    
        })}
    })
    app.delete("/api/student/:id",(req,res)=>{
        const search=arr.findIndex(obj=>obj.id==req.params.id)
        
            try{
        if(search== -1){
        res.status(400).json({
        status:"failed",
        meassage:"There is no such student"
        })}
        arr.splice(search,1)
        res.json({
            status:"succes",
            message:"record deleted"
        })
        
            }
        catch(e){
            res.status(400).json({
        status:"failed",
        meassage:e.meassage
                
        })
        }
        })
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   