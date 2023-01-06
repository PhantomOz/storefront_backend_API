import { ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Check if the Method of the Product model are available", () => {
  it("should return true if index is defined", () => {
    expect(store.index).toBeDefined();
  });
  it("should return true if show is defined", () => {
    expect(store.show).toBeDefined();
  });
  it("should return true if create is defined", () => {
    expect(store.create).toBeDefined();
  });
  it("should return true if topFive is defined", () => {
    expect(store.topFive).toBeDefined();
  });
  it("should return true if getCategories is defined", () => {
    expect(store.getCategories).toBeDefined();
  });
});
describe("Testing Product Methods", () => {
  it("should return Empty array", async () => {
    const products = await store.index();
    expect(products).toEqual([]);
  });
  it("should create a new Product", async () => {
    const product = await store.create({
      name: "skirt",
      price: 20,
      category: "clothing",
    });
    expect(product).toEqual({
      id: 1,
      name: "skirt",
      price: 20,
      category: "clothing",
    });
  });
  it("should get product by id", async () => {
    const product = await store.show(1);
    expect(product).toEqual({
      id: 1,
      name: "skirt",
      price: 20,
      category: "clothing",
    });
  });
  it("should get topFive products", async () => {
    const products = await store.topFive();
    expect(products).toEqual([
      { id: 1, name: "skirt", price: 20, category: "clothing" },
    ]);
  });
  it("should get product by categories", async () => {
    const categories = await store.getCategories("clothing");
    expect(categories).toEqual([
      { id: 1, name: "skirt", price: 20, category: "clothing" },
    ]);
  });
});
