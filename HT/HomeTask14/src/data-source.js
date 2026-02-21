const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "homework13",
  synchronize: true,
  logging: true,
  entities: ["./dist/**/*.entity.js"],
  migrations: ["./src/migrations/*.ts"],
});

module.exports = AppDataSource;
