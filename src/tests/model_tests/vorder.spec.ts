import { OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Check If the Methods in Orders are defined", () => {
  it("Should return true currentOrder is defined", () => {
    expect(store.currentOrder).toBeDefined();
  });
  it("Should return true completedOrder is defined", () => {
    expect(store.completeOrder).toBeDefined();
  });
  it("Should return true create is defined", () => {
    expect(store.create).toBeDefined();
  });
});

describe("Testing Order Methods", () => {
  it("Should create a new Order", async () => {
    const order = await store.create(1, 1, 20);
    expect(order).toEqual({
      id: 1,
      user_id: 1,
      product_id: 1,
      quantity: 20,
      status: "active",
    });
  });
  it("Should get current Order", async () => {
    const order = await store.currentOrder(1);
    expect(order).toEqual({
      id: 1,
      user_id: 1,
      product_id: 1,
      quantity: 20,
      status: "active",
    });
  });
  it("Should get an empty array of completed Order", async () => {
    const order = await store.completeOrder(1);
    expect(order).toEqual([]);
  });
});
