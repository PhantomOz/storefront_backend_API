import client from "../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Cannot get users from database");
    }
  } //shows all users

  async show(id: number): Promise<User> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id = $1";
      const pSql = "SELECT * FROM orders WHERE user_id = $1";
      const result = await conn.query(sql, [id]);
      const purchase = await conn.query(pSql, [id]);
      conn.release();
      return { ...result.rows[0], purchase: purchase.rows };
    } catch ({ message }) {
      throw new Error(`Cannot get user from database err - ${message}`);
    }
  } //Get a particular user with the given id

  async create(user: User): Promise<User> {
    const { BCRYPT_PASSWORD, SALTROUND } = process.env;
    try {
      //ts-ignore
      const conn = await client.connect();
      const pSql = "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";

      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
      const oldUser = await conn.query(pSql, [user.firstname, user.lastname]);

      if (!oldUser.rows[0]) {
        const hash = bcrypt.hashSync(
          user.password + BCRYPT_PASSWORD,
          Number(SALTROUND)
        );
        const result = await conn.query(sql, [
          user.firstname,
          user.lastname,
          hash,
        ]);
        const newUser = result.rows[0];
        conn.release();
        return newUser;
      }
      // console.log(result);
      conn.release();
      throw new Error("User already exists in database");
    } catch ({ message }) {
      throw new Error(`Cannot create user in database error: ${message}`);
    }
  } // Create new Users

  async authenticate(user: User): Promise<string> {
    const { BCRYPT_PASSWORD } = process.env;

    const conn = await client.connect();
    const sql = "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";

    const result = await conn.query(sql, [user.firstname, user.lastname]);

    if (result.rows.length) {
      const info = result.rows[0];

      if (bcrypt.compareSync(user.password + BCRYPT_PASSWORD, info.password)) {
        const sign = jwt.sign(info, String(process.env.JWTSECRET));
        return sign;
      }
    }

    conn.release();
    throw new Error("Invalid credentials");
  } // Authentication of user credentials
}
