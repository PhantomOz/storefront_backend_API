import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";
import isAuthorized from "../middleware/authorization";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch ({ message }) {
    res.status(404).json(message);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get("/products_in_orders", isAuthorized, productsInOrders);
};
export default dashboardRoutes;
