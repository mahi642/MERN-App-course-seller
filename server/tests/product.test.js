const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /admin/courses", () => {
  it("returns courses", async () => {
    const res = await request(app).get("/admin/courses");
    expect(res.statusCode).toBe(200); // Fixed 'exprect' typo
    expect(res.body.courses.length).toBeGreaterThan(0); // Access 'courses' array
  });
});
