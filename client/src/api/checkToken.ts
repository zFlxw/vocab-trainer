import jwt, { JwtPayload } from "jsonwebtoken";

function checkForToken(): boolean {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const payload = jwt.decode(token);

  if (payload) {
    if (Number((payload as JwtPayload).exp) * 1000 <= Date.now()) {
      localStorage.remove("token");
      return false;
    }
  }

  return true;
}

export default checkForToken;
