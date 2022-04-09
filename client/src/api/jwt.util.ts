import jwt_decode, { JwtPayload } from "jwt-decode";

export function checkForToken(): boolean {
  const payload = decodeToken()

  if (payload) {
    if (Number((payload as JwtPayload).exp) * 1000 <= Date.now()) {
      localStorage.removeItem("token");
      return false;
    } else {
      return true;
    }
  }

  return false;
}

export function decodeToken(): Token | null {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return jwt_decode(token);
}

interface Token {
  id: number,
  username: string,
  iat: number,
  exp: number
}
