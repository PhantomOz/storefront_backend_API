import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//Extend The Request Params to have user
declare global {
  namespace Express {
    interface Request {
      user: String;
    }
  }
}

//Check if the user is logged In
const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(" ")[1];
  const user = jwt.verify(String(token), String(process.env.JWTSECRET));

  req.user = JSON.stringify(user);
  if (!token || !user) {
    return res.status(401).json({ error: "Access Denied, Invalid token" });
  }

  next();
};

export default isAuthorized;
