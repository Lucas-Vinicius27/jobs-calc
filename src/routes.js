const express = require("express");
const routes = express.Router();

const basePath = __dirname + "/views/";

const profile = {
    name: "Lucas Santos",
    avatar: "https://github.com/lucas-vinicius27.png",
    "monthly-budget": 3000,
    "hours-per-day": 6,
    "days-per-week": 5,
    "vacation-per-year": 4
};

routes.get("/", (req, res) => res.render(basePath + "index", {
    name: profile.name,
    avatar: profile.avatar
}));

routes.get("/profile", (req, res) => res.render(basePath + "profile", { profile }));

routes.get("/job/edit", (req, res) => res.render(basePath + "job-edit"));

routes.get("/job", (req, res) => res.render(basePath + "job"));
routes.post("/job/delete/:value", (req, res) => res.redirect("/"));

module.exports = routes;
