const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
    index(req, res) {
        let statusCount = {
            progress: 0,
            done: 0,
            total: Job.get().length
        };

        let jobTotalHours = 0;

        const updatedJobs = Job.get().map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";

            statusCount[status] += 1;

            jobTotalHours = status === "progress"
                ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours;

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(
                    Profile.get()["value-hour"],
                    job["total-hours"]
                )
            };
        });

        const freeHours = Profile.get()["hours-per-day"] - jobTotalHours;

        return res.render("index", {
            name: Profile.get().name,
            avatar: Profile.get().avatar,
            jobs: updatedJobs,
            statusCount,
            freeHours
        });
    }
};
