let data = {
    name: "Lucas Santos",
    avatar: "https://github.com/lucas-vinicius27.png",
    "monthly-budget": 3000,
    "hours-per-day": 6,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
};

module.exports = {
    get() {
        return data;
    },
    set(newData) {
        data = newData;
    }
};
