# 🏎️ F1 Dashboard Website ![Node.js](https://img.shields.io/badge/node.js-4F46E5?style=for-the-badge&logo=node.js&logoColor=white)

A modern web application displaying real-time **Formula 1** data: driver standings, team info, 2026 race schedule, news, and past results. Built with Node.js, Express, and EJS. Fetches live data from official F1 APIs.

 

## ✨ Features
- **Home (/)**: Current driver standings, upcoming races (2026 schedule), recent race results, top 5 F1 news articles.
- **Drivers (/drivers)**: Full list of drivers from latest session.
- **Teams (/teams)**: Unique teams with associated drivers.
- **Schedule (/schedule)**: 2026 F1 calendar with dates and locations.
- Responsive design with custom CSS and high-quality images (circuits, drivers, teams).
- Real-time API data (no database needed).

## 🛠️ Tech Stack
- **Backend**: Node.js (ESM), Express 5.x
- **Frontend**: EJS templates, Vanilla CSS
- **Data**: Axios for APIs
  - Driver standings/results: [Ergast F1 API](https://api.jolpi.ca/ergast/)
  - Drivers/Teams/Schedule: [OpenF1 API](https://api.openf1.org/)
  - News: [NewsAPI](https://newsapi.org/)
- **Assets**: 20+ circuits, drivers, teams images

## 🚀 Quick Start
1. Clone/download the repo.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the server:
   ```
   node index.js
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: NewsAPI key is hardcoded (for demo). For production, use `.env` and `dotenv`.

## 📁 Project Structure
```
f1-website/
├── index.js          # Express server & API routes
├── package.json      # Dependencies
├── views/            # EJS templates
│   ├── index.ejs     # Home
│   ├── drivers.ejs
│   ├── teams.ejs
│   ├── schedule.ejs
│   └── partials/     # Header/footer
├── public/           # Static files
│   ├── css/          # Styles (home.css, drivers.css, etc.)
│   └── images/       # Circuits/drivers/teams
└── README.md         # You're reading it!
```

## 🧪 Testing the App
- Start server: `node index.js`
- Expected output: `Port open at 3000`
- Visit routes:
  | Route | Description |
  |-------|-------------|
  | `/` | Dashboard |
  | `/drivers` | Drivers list |
  | `/teams` | Teams overview |
  | `/schedule` | Race calendar |

## 🔧 Local Development
- Add `nodemon` for hot reload: `npm i -D nodemon`
- Update `package.json` scripts:
  ```json
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
  ```
- Hide API key: Create `.env` with `NEWS_API_KEY=yourkey`, use `dotenv`.

## 📈 Future Improvements (Todo)
- Add search/filter on pages.
- Historical data cache.
- Authentication for custom API keys.
- Deploy to Vercel/Heroku.

## 🤝 Contributing
1. Fork the repo.
2. Create branch: `git checkout -b feature/xyz`
3. Commit: `git commit -m "Add xyz"`
4. Push/PR.

## 📄 License
MIT License – See [LICENSE](LICENSE) 

**Made with ❤️ for F1 fans! Report issues or suggest features.**

