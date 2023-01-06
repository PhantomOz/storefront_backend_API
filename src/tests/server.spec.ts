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
describe("Testing the API endpoint for Product Handler", () => {
  it("/GET Should return All Products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([...response.body]);
  });
  it("/GET Should return a Product by id", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "skirt",
      price: 20,
      category: "clothing",
    });
  });
  it("/POST Should return a newly created Product", async () => {
    const response = await request
      .post("/products")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Trousers",
        price: 20,
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 2,
      name: "Trousers",
      price: 20,
      category: null,
    });
  });
  it("/GET Should return the topFive Product", async () => {
    const response = await request.get("/products/topfive");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });
  it("/GET Should return Products in a category", async () => {
    const response = await request.get("/products/category/clothing");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "skirt",
        price: 20,
        category: "clothing",
      },
    ]);
  });
});
