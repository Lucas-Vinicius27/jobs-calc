let data = [
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
];

module.exports = {
    get() {
        return data;
    },
    set(newData) {
        data = newData;
    },
    create(newJob) {
        data.push(newJob);
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    }
};
