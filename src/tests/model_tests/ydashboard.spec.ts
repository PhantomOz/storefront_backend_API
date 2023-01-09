import { DashboardQueries } from "../../services/dashboard";

const store = new DashboardQueries();

describe("Check If Methods are Defined and Functionality works", () => {
  it("Should return true if productsInOrders is defined", () => {
    expect(store.productsInOrders).toBeDefined();
  });
  it("Should return true if productsInOrders works", async () => {
    const productsInOrders = await store.productsInOrders();
    expect(productsInOrders).toEqual([
      {
        id: 1,
        name: "skirt",
        price: 20,
        category: "clothing",
        quantity: 20,
        order_id: 1,
        product_id: 1,
      },
    ]);
  });
});
