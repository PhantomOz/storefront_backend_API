import { Request, Response, Application } from "express";
import { OrderStore } from "../models/order";

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

const order_routes = (app: Application) => {
  app.get("/order/current", currentOrder);
  app.get("/order/completed", completedOrders);
};
