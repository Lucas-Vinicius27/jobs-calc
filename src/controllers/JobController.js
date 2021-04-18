const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
    create(req, res) { return res.render("job") },
    async save(req, res) {
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        });

        return res.redirect("/");
    },
    async show(req, res) {
        const jobId = req.params.id;
        const job = await Job.get().find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("Job not found!");
        }

        job.budget = JobUtils.calculateBudget(
            await Profile.get()["value-hour"],
            job["total-hours"]
        );

        return res.render("job-edit", { job });
    },
    async update(req, res) {
        const jobId = req.params.id;

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        };

        await Job.update(updatedJob, jobId);

        return res.redirect(`/job/${jobId}/edit`);
    },
    async delete(req, res) {
        await Job.delete(req.params.id);

        return res.redirect("/");
    }
};