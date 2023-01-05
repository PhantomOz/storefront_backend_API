import { Request, Response, Application } from "express";
import { OrderStore } from "../models/order";
import isAuthorized from "../middleware/authorization";

const store = new OrderStore();

const currentOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.currentOrder(Number(JSON.parse(req.user).id));
    res.status(200).json(order);
  } catch ({ message }) {
    res.status(404).json({ message: message });
  }
};

const completedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.completeOrder(Number(JSON.parse(req.user).id));
    res.status(200).json(orders);
  } catch ({ message }) {
    res.status(404).json({ message: message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order = await store.create(
      Number(JSON.parse(req.user).id),
      req.body.product_id,
      req.body.quantity
    );
    res.status(201).json(order);
  } catch ({ message }) {
    res.status(400).json({ message: message });
  }
};

const order_routes = (app: Application) => {
  app.get("/order/current", isAuthorized, currentOrder);
  app.get("/order/completed", isAuthorized, completedOrders);
  app.post("/order", isAuthorized, create);
};

export default order_routes;
