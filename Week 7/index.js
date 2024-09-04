const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");
const userRoutes = require("./routes/userRoute");
const User = require("./models/user"); // Importing User model

const app = express();
// Create HTTP server
const server = http.createServer(app);
// Attach Socket.IO to the HTTP server
const io = socketIo(server);

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
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// External routes
app.use(userRoutes);

// DB Connection and User Model Creation
mongoose.connect("mongodb://localhost:27017/Database");
const db = mongoose.connection;
db.on("error", () => console.log("Error in connecting to db"));
db.once("open", () => console.log("Connected to db"));

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
      password: hashedPassword,
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

// Login Process Starts
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

// Public Routes
app.get("/signUp", (req, res) => {
  const filepath = path.join(__dirname, "public", "signUp.html");
  res.sendFile(filepath);
});
app.get("/login", (req, res) => {
  const filepath = path.join(__dirname, "public", "login.html");
  res.sendFile(filepath);
});

// Protect dashboard route with authentication middleware
app.get("/dashboard", isAuthenticated, (req, res) => {
  const filepath = path.join(__dirname, "private", "dashboard.html");
  res.sendFile(filepath);
});

// Example API route
app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
  const firstNumber = parseInt(req.params.firstNumber);
  const secondNumber = parseInt(req.params.secondNumber);
  const result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

// Start the server
const port = 3040;
server.listen(port, () => {
  console.log("Server is running on port " + port);
});

/* Sockets */
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});
