const userSchema = require("../utils/validate.js");
let posts = [];

async function getPost(req, res) {
  res.render("post");
}

async function userPost(req, res) {
  const { title, description } = req.body;
  const {error} = userSchema.taskSchema.validate(req.body)

  if(error){
    return res.status(400).json({ message: error.details[0].message });
  }
  const pushPost = {title, description, date: new Date()}
  posts.push(pushPost);
  res.status(201).json(newPost);
}

module.exports = { getPost, userPost };
