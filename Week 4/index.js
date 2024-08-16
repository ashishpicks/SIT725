const express= require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
const bcrypt = require('bcrypt');


const path=require("path");
const session=require("express-session");



const app= express();

// Configure session
app.use(
    session({
        secret: "##11!!@@", // Strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // When using HTTPS set True
    })
);


    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
        extended:true
    }))

//DB Connection and User Model Creation    

mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error', () => console.log("Error in connecting to db"))
db.once('open', () => console.log("Connected to db"))

// Define user schema and model
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String,
});

const User = mongoose.model("User", userSchema);


    // Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect("/login"); // Redirect to login if not authenticated
}


// Inserting signup information into the database
app.post("/sign_up", async (req, res) => {
    const { firstname, lastname, age, email, phno, gender, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const newUser = new User({
        firstname,
        lastname,
        age,
        email,
        phno,
        gender,
        password:hashedPassword,
      });
  
      // Saving user using async/await
      const user = await newUser.save();
  
      console.log("Record inserted successfully");
  
      // Set session user
      req.session.user = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
  
      // Log session data for debugging
      console.log("Session after sign-up:", req.session);
  
      return res.redirect("/dashboard"); // Redirect to dashboard after sign-up
    } catch (err) {
      console.error("Error inserting record:", err);
      return res.status(500).send("Error inserting record");
    }
  });

  //Inserting user info finish
  

  // Login Process Starts //
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log("User not found");
        return res.status(401).send("Invalid email or password");
      }
  
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          console.log("Invalid password");
          return res.status(401).send("Invalid email or password");
        }
      // Set session user if authentication is successful
      req.session.user = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
  
      console.log("User authenticated successfully");
  
      // Log session data for debugging
      console.log("Session after login:", req.session);
  
      return res.redirect("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).send("Error during login");
    }
  });


  // Logout route
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Error logging out");
      }
      res.redirect("/login");
    });
  });


  /*Login Process Finish*/

  //Public Routes
    app.get("/signUp",(req,res)=>{
        const filepath=path.join(__dirname,"public", "signUp.html");
        res.sendFile(filepath);
    })
    app.get("/login",(req,res)=>{
        const filepath=path.join(__dirname,"public", "login.html");
        res.sendFile(filepath);
    })

    // Protect dashboard route with authentication middleware
    /* app.get("/dashboard", isAuthenticated, (req, res) => {
        const filepath = path.join(__dirname, "private", "dashboard.html");
        res.sendFile(filepath);
    }) */

    // Protect dashboard route with authentication middleware
    app.get("/dashboard", isAuthenticated, (req, res) => {
      const filepath = path.join(__dirname, "private", "dashboard.html");
      res.sendFile(filepath);
  })



/* server running port code */
    const port=3040;
    app.listen(port,()=> {
        console.log("hello i'm listening to port "+port);
    })
    