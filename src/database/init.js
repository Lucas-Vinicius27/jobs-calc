const Database = require("./config");

Database();

Database.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    hours_per_day INT,
    days_per_week INT,
    vacation_per_year INT,
    value_hour INT
)`);

Database.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);

Database.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    hours_per_day,
    days_per_week,
    vacation_per_year
) VALUES (
    "Lucas Santos",
    "https://github.com/lucas-vinicius27.png",
    3000,
    6,
    5,
    4
);`);

Database.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    5,
    6,
    1617514376018
);`);

Database.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Project",
    6,
    56,
    1617514376018
);`);

Database.close();
