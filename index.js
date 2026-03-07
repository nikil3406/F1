import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/drivers",async (req,res)=>{
    try{
        const result = await axios.get("https://api.openf1.org/v1/drivers?session_key=latest");
        const drivers = result.data;
        res.render("drivers.ejs",{drivers:drivers});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Failed to fetch the drivers data")
    }
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