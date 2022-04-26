import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { decodeToken } from "./authentication";

export async function getUserByToken(token: string): Promise<User | null> {
  const id = decodeToken(token)?.id;
  if (!id) {
    return null;
  }

  return getUserById(id);
}

export async function getUserById(id: number): Promise<User | null> {
  const user = await getRepository(User).findOne({ where: { id: Number(id) } });
  if (user) {
    return user;
  }

  return null;
}