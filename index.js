import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const teams = [];
const schedule = [];
const location = [];
const date = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        // Parallelize major sections
        const [standingsRes, sessionsRes, newsRes] = await Promise.allSettled([
            axios.get("https://api.jolpi.ca/ergast/f1/current/driverStandings"),
            axios.get("https://api.openf1.org/v1/sessions?year=2026"),
            axios.get(`https://newsapi.org/v2/everything?q=formula%201&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`)
        ]);

        const rank = standingsRes.status === 'fulfilled' ? standingsRes.value.data.MRData.StandingsTable.StandingsLists[0].DriverStandings : [];
        const schedules = sessionsRes.status === 'fulfilled' ? sessionsRes.value.data : [];
        const articles = newsRes.status === 'fulfilled' ? newsRes.value.data.articles.slice(0, 6) : [];

        // Process schedule
        const schedule = [];
        const location = [];
        const date = [];
        schedules.forEach(s => {
            if (!schedule.includes(s.country_name)) {
                schedule.push(s.country_name);
                location.push(s.location);
                date.push(s.date_start ? s.date_start.split("T")[0] : 'TBD');
            }
        });

        // Fetch race results in parallel (limit to first 10 for performance, or use more if needed)
        // Only fetch if standings were successful or as a fallback
        const raceResultsPromises = [];
        for (let i = 1; i <= 10; i++) {
            raceResultsPromises.push(axios.get(`https://api.jolpi.ca/ergast/f1/current/${i}/results`).catch(e => null));
        }

        const raceResultsRaw = await Promise.all(raceResultsPromises);
        const raceResults = raceResultsRaw
            .filter(r => r && r.data.MRData.RaceTable.Races[0])
            .map(r => {
                const race = r.data.MRData.RaceTable.Races[0];
                return {
                    round: race.round,
                    raceName: race.raceName,
                    results: race.Results
                };
            });

        res.render("index", { 
            rank, 
            schedule, 
            location, 
            date, 
            raceResults, 
            articles,
            error: null 
        });
    } catch (error) {
        console.error("Critical error in home route:", error);
        res.render("index", { 
            rank: [], 
            schedule: [], 
            location: [], 
            date: [], 
            raceResults: [], 
            articles: [],
            error: "Some data could not be loaded. Please try again later."
        });
    }
});

app.get("/drivers", async (req, res) => {
    try {
        const result = await axios.get("https://api.openf1.org/v1/drivers?session_key=latest");
        const drivers = result.data;
        res.render("drivers.ejs", { drivers: drivers });
    } catch (error) {
        console.error("Error fetching drivers:", error);
        res.status(500).render("drivers.ejs", { drivers: [], error: "Failed to fetch drivers data" });
    }
});

app.get("/teams", async (req, res) => {
    try {
        const result = await axios.get("https://api.openf1.org/v1/drivers?session_key=latest");
        const drivers = result.data;
        const teams = [];
        drivers.forEach(d => {
            if (d.team_name && !teams.includes(d.team_name)) {
                teams.push(d.team_name);
            }
        });
        res.render("teams.ejs", { teams: teams, drivers: drivers });
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).render("teams.ejs", { teams: [], drivers: [], error: "Failed to fetch teams data" });
    }
});

app.get("/schedule", async (req, res) => {
    try {
        const result = await axios.get("https://api.openf1.org/v1/sessions?year=2026");
        const schedules = result.data;
        const schedule = [];
        const location = [];
        const date = [];
        schedules.forEach(s => {
            if (!schedule.includes(s.country_name)) {
                schedule.push(s.country_name);
                location.push(s.location);
                date.push(s.date_start ? s.date_start.split("T")[0] : 'TBD');
            }
        });
        res.render("schedule.ejs", { schedule: schedule, location: location, date: date });
    } catch (error) {
        console.error("Error fetching schedule:", error);
        res.status(500).render("schedule.ejs", { schedule: [], location: [], date: [], error: "Failed to fetch schedule" });
    }
});

app.get("/home",(req,res)=>{
    res.redirect("/");
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
