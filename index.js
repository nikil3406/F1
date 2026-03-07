import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/drivers",(req,res)=>{
    res.render("drivers.ejs");
})

app.get("/teams",(req,res)=>{
    res.render("teams.ejs");
})

app.get("/schedule",(req,res)=>{
    res.render("schedule.ejs");
})

app.get("/home",(req,res)=>{
    res.redirect("/");
})
app.listen(port, () => {
    console.log(`Port open at ${port}`);
});