import { UserStore } from "../../models/user";

const store = new UserStore();
describe("Check if Methods are defined", () => {
  it("Should return true if Index method is defined", () => {
    expect(store.index).toBeDefined();
  });
  it("Should return true if show method is defined", () => {
    expect(store.show).toBeDefined();
  });
  it("Should return true if create method is defined", () => {
    expect(store.create).toBeDefined();
  });
  it("Should return true if authenticate method is defined", () => {
    expect(store.authenticate).toBeDefined();
  });
});
describe("Testing User Actions", () => {
  it("should get an empty list of all users", async () => {
    const users = await store.index();
    expect(users).toEqual([]);
  });
  it("should create a user && the password should be different", async () => {
    const user = { firstname: "John", lastname: "doe", password: "love" };
    const createdUser = await store.create(user);
    expect(createdUser.password).not.toEqual(user.password);
  });
  it("should show a user", async () => {
    const user = await store.show(1);
    expect(user.firstname).toEqual("John");
  });
  it("should authenticate a user", async () => {
    const token = await store.authenticate({
      firstname: "John",
      lastname: "doe",
      password: "love",
    });
    expect(typeof token).toEqual("string");
  });
});
