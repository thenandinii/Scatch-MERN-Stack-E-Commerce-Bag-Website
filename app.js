const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const indexRouter = require('./routes/index');
const expressSession = require("express-session");
const flash = require("connect-flash")
  
require("dotenv").config()

const cookieParser = require('cookie-parser');     
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
   
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(
  expressSession({
resave: false, 
saveUninitialized: false,
secret: process.env.EXPRESS_SESSION_SECRET,
})
);
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", indexRouter); // this will serve index.js at the root path

app.use("/owner", ownersRouter);
app.use("/user", usersRouter);
console.log("✅ /user routes mounted")  
app.use('/owner/product', productRouter);      

app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});




app.listen(3000);  