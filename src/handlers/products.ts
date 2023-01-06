import { Request, Response, Application } from "express";
import { ProductStore } from "../models/product";
import isAuthorized from "../middleware/authorization";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.status(200).json(products);
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(Number(req.params.id));
    res.status(200).json(product);
  } catch ({ message }) {
    res.status(404).json({ message: message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = await store.create(req.body);
    res.status(201).json(product);
  } catch ({ message }) {
    res.status(400).json({ message: message });
  }
};

const topFive = async (req: Request, res: Response) => {
  const products = await store.topFive();
  res.status(200).json(products);
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.getCategories(req.params.category);
    res.status(200).json(products);
  } catch ({ message }) {
    res.status(404).json({ message: message });
  }
};

const product_routes = (app: Application) => {
  app.get("/products", index);
  app.post("/products", isAuthorized, create);
  app.get("/products/topfive", topFive);
  app.get("/products/:id", show);
  app.get("/products/category/:category", getCategory);
};

export default product_routes;
