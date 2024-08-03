const express= require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

const path=require("path");

    const app= express();
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
        extended:true
    }))

    mongoose.connect('mongodb://localhost:27017/Database')
    var db=mongoose.connection
    db.on('error',()=>console.log("Error in connecting to db"))
    db.once('open',()=>console.log("Connected to db"))


    /* inserting signup information to db*/
    app.post("/sign_up",(req,res)=>{
        var firstname=req.body.firstname
        var lastname=req.body.lastname
        var age=req.body.age
        var email=req.body.email
        var phno=req.body.phno
        var gender=req.body.gender
        var password=req.body.password

        var data={
            "firstname":firstname,
            "lastname":lastname,
            "age":age,
            "email":email,
            "phno":phno,
            "gender":gender,
            "pasword":password

        }
        db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record inserted successfully")
        })
        return res.redirect('dashboard.html');
    })



    app.get("/signUp",(req,res)=>{
        const filepath=path.join(__dirname,"public", "signUp.html");
        res.sendFile(filepath);
    })
    app.get("/login",(req,res)=>{
        const filepath=path.join(__dirname,"public", "login.html");
        res.sendFile(filepath);
    })



    const port=3040;
    app.listen(port,()=> {
        console.log("hello i'm listening to port "+port);
    })
    