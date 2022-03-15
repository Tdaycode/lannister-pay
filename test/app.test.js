import app from "../app.js";
import request from "supertest";

test("Check app working", async() => {
     await request(app)
      .get("/")
      .expect("Content-Length", "15")
      .expect("Content-Type", /json/)
      .expect(200)
     
  
  });

