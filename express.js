import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();

//Restrict API to only usernames in ALLOWED_USERNAMES
const ALLOWED = (process.env.ALLOWED_USERNAMES || "BisocM")
  .split(",")
  .map(u => u.trim().toLowerCase());

app.use((req, res, next) => {
  const user = String(req.query.username || "").toLowerCase();
  if (!ALLOWED.includes(user)) {
    return res
      .status(403)
      .send("Forbidden — this instance only serves authorized GitHub usernames.");
  }
  next();
});

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);

app.listen(process.env.port || 9000);