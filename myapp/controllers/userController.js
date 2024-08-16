const userSchema = require('../utils/validate.js');
const md5 =  require('md5');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/user.json'); 
const fs = require('fs');
let users = [];




async function getRegister(req, res) {
  res.render("register");
}

async function getLogin(req, res) {
  res.render("login");
}

async function getProfile(req, res) {
  res.render("profile");
}

async function register(req, res) {
  const { fName, lName, email, password } = req.body;

  const  {error}  = userSchema.schemaRegister.validate(req.body); 
  if (error) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const pushUser = {
    fName,
    lName,
    email,
    password: md5(md5(password) + "__secret__")
  };
  res.status(201).render("profile");
  users.push(pushUser);
  
  const userJson = JSON.stringify(pushUser);


 fs.writeFile(usersFilePath, userJson, (err) => {
   if (err) {
     console.error("Error writing to user.json:", err);
     return res.status(500).json({ message: "Internal server error" });
   }
   console.log("User registered successfully:", pushUser);
   return res.status(201)
 });

}



async function login(req, res) {
  const { email, password } = req.body;

  const { error } = userSchema.schemaLogin.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "All fields are required" });
  }

  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading user.json:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    try {
      const users = JSON.parse(data);
      const user = users.find((u) => u.email === email);

      if (!user || user.password !== md5(md5(password) + "__secret__")) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.render("profile");
    } catch (parseError) {
      console.error("Error parsing user data:", parseError);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
}



module.exports = { getRegister, register, getLogin, login,getProfile};
