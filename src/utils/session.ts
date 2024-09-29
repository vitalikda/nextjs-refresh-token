import type { Context, Next } from "hono";
import { verifyJwt } from "src/utils/jwt";

const sessions = new Map<
  string,
  {
    valid: boolean;
    email: string;
    id: string;
  }
>();

export const getSession = (id: string) => {
  return sessions.get(id)?.valid ? sessions.get(id) : null;
};

export const invalidateSession = (id: string) => {
  const hasSession = getSession(id);
  if (hasSession) {
    sessions.delete(id);
  }
};

export const createSession = (email: string) => {
  const id = (Math.random() + 1).toString(36).substring(7);
  const session = { valid: true, email, id };
  sessions.set(id, session);

  return session;
};

export const verifySession = async (c: Context, next: Next) => {
  const token = c.req.header("authorization")?.split(" ")?.at(1);

  if (!token) {
    return c.json({ message: "Auth required!" }, 401);
  }

  const payload = await verifyJwt(token);

  if (!payload) {
    return c.json({ message: "Token expired!" }, 403);
  }

  c.set("sessionId", payload?.sessionId as string);

  await next();
};
