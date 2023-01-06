import app from "../server";
import supertest from "supertest";

const request = supertest(app);
let token: string;

describe("Testing endpoint response for Users", () => {
  it("/GET Should return All User", async () => {
    const response = await request.get("/users");
    expect(response.body).toEqual([...response.body]);
  });
  it("/POST Should return newly created user", async () => {
    const response = await request.post("/users").send({
      firstname: "Favour",
      lastname: "aniogor",
      password: "pass123",
    });
    expect(response.body).toEqual({
      id: 2,
      firstname: "Favour",
      lastname: "aniogor",
      password: response.body.password,
    });
  });
  it("/POST Should Authenticate the User", async () => {
    const response = await request.post("/users/login").send({
      firstname: "Favour",
      lastname: "aniogor",
      password: "pass123",
    });
    token = response.body;

    expect(response.status).toBe(201);
    expect(typeof response.body).toEqual("string");
  });
  it("/GET Should get a User by an id", async () => {
    const response = await request
      .get(`/users/1`)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstname: "John",
      lastname: "doe",
      password: response.body.password,
    });
  });
});
