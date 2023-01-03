import client from "../utils/database";

export type User = {
  id: number;
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
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot get user from database");
    }
  } //Get a particular user with the given id

  async create(user: User): Promise<User> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3)";
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.password,
      ]);
      const newUser = result.rows[0];
      conn.release();
      return newUser;
    } catch (error) {
      throw new Error("Cannot create user in database");
    }
  }
}
