const express = require("express");
const routes = express.Router();

const basePath = __dirname + "/views/";

const Profile = {
    data: {
        name: "Lucas Santos",
        avatar: "https://github.com/lucas-vinicius27.png",
        "monthly-budget": 3000,
        "hours-per-day": 6,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
};

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 5,
            "total-hours": 6,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 6,
            "total-hours": 56,
            created_at: Date.now()
        }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? "done" : "progress";

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile["value-hour"] * job["total-hours"]
                };
            });

            return res.render(basePath + "index", {
                name: Profile.data.name,
                avatar: Profile.data.avatar,
                jobs: updatedJobs
            });
        },
        create(req, res) { res.render(basePath + "job") },
        save(req, res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            });

            res.redirect("/");
        },
    },
    services: {
        remainingDays(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
            const createdDate = new Date(job.created_at);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);
            const timeDiffInMs = dueDateInMs - Date.now();
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);

            return dayDiff;
        },
    },
};

routes.get("/", Job.controllers.index);

routes.get("/profile", (req, res) => res.render(basePath + "profile", { profile: Profile.data }));

routes.get("/job/edit", (req, res) => res.render(basePath + "job-edit"));

routes.get("/job", Job.controllers.create);

routes.post("/job", Job.controllers.save);

routes.post("/job/delete/:value", (req, res) => res.redirect("/"));

module.exports = routes;
