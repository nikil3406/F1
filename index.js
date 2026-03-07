import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const teams = [];
const schedule = [];
const location = [];
const date = [];

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

app.get("/teams",async (req,res)=>{
    try{
        const result = await axios.get("https://api.openf1.org/v1/drivers?session_key=latest");
        const drivers = result.data;
        for(let i = 0; i < drivers.length; i++){

            if(!teams.includes(drivers[i].team_name)){
                teams.push(drivers[i].team_name);
            }
        }
        res.render("teams.ejs",{teams:teams,drivers:drivers});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Failed to fetch the teams data");
    }
})

app.get("/schedule",async (req,res)=>{
    try{
        const result = await axios.get("https://api.openf1.org/v1/sessions?year=2026");
        const schedules = result.data;
        for(let i = 0; i < schedules.length; i++){

            if(!schedule.includes(schedules[i].country_name)){
                schedule.push(schedules[i].country_name);
                location.push(schedules[i].location);
                date.push(schedules[i].date_start.split("T")[0]);
            }
        }
        res.render("schedule.ejs",{schedule:schedule,location:location,date:date});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Failed to fetch schedule");
    }
    
})

app.get("/home",(req,res)=>{
    res.redirect("/");
})
app.listen(port, () => {
    console.log(`Port open at ${port}`);
});