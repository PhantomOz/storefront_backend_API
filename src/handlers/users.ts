import { Request, Response, Application } from "express";
import { UserStore } from "../models/user";
import isAuthorized from "../middleware/authorization";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch ({ message }) {
    res.status(404).json(message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(Number(req.params.id));
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(404).json({ message: message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body);
    res.status(201).json(user);
  } catch ({ message }) {
    res.status(400).json({ message: message });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const token = await store.authenticate(req.body);
    res.status(201).json(token);
  } catch ({ message }) {
    res.status(400).json({ message: message });
  }
};

const user_routes = (app: Application) => {
  app.get("/users", index);
  app.post("/users", create);
  app.get("/users/:id", isAuthorized, show);
  app.post("/users/login", authenticate);
};

export default user_routes;
