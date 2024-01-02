import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var blogheading = [];
var blog = [];

app.get("/", (req, res) => {
  res.render("home.ejs", {
    Blogheading: blogheading,
    Blog: blog,
  });
});

app.get("/dailyjournal", (req, res) => {
  res.render("compose.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/newpost", (req, res) => {
  const getblogheading = req.body.heading;
  const getblog = req.body.feedback;

  blogheading.push(getblogheading);
  blog.push(getblog);

  res.render("home.ejs", {
    Blogheading: blogheading,
    Blog: blog,
  });
 console.log(blogheading);

});
app.get("/posts/:user",function (req,res) {
  
    console.log(req.params.user);
    const i=blogheading.indexOf(req.params.user);
    
    console.log(i);

    if(i!==-1) {
      res.render("blogopost.ejs",{
        Blogheading:blogheading[i],
        Blog:blog[i],
      });
    }else {
      res.send("No blog found");
    }
  })
app.get("/home", (req, res) => {
  res.render("home.ejs", {
    Blogheading: blogheading,
    Blog: blog,
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
