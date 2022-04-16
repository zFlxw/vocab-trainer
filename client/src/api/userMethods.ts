import { User } from "@/models/User";
import { decodeToken } from "./jwt.util";
import { get } from "./methods";

/**
 * Requests a user from the backend.
 * 
 * @returns A promise that resolves to the user.
 */
export async function requestUser(): Promise<User> {
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken();
  if (!decodedToken || !token) {
    throw new Error("No token found");
  }

  const id = Number(decodedToken.id);
  const response = await get(`/users/${id}`, true);
  const { username, email } = response.data;

  return { id, username, email, token };
}