import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createUser, getUser } from "src/db/users";
import { generateJwt, verifyJwt } from "src/utils/jwt";
import {
  createSession,
  getSession,
  invalidateSession,
  verifySession,
} from "src/utils/session";
import { REFRESH_TOKEN_KEY } from "src/utils/tokens";
import { z } from "zod";

type Variables = {
  sessionId: string;
};

const auth = new Hono<{ Variables: Variables }>();

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

auth.post(
  "/login",
  zValidator("json", userSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: "Bad request" }, 400);
    }
  }),
  async (c) => {
    const { email, password } = c.req.valid("json");

    let user = await getUser(email);

    if (!!user && user.password !== password) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    if (!user) {
      user = await createUser({ email, password });
    }

    const session = createSession(email);

    const accessToken = await generateJwt({
      email,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
      sessionId: session.id,
    });

    const refreshToken = await generateJwt({
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
      sessionId: session.id,
    });

    setCookie(c, REFRESH_TOKEN_KEY, refreshToken, {
      secure: true,
      maxAge: 1000,
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });

    return c.json({
      sessionId: session?.id,
      email: session?.email,
      accessToken,
      refreshToken,
    });
  },
);

auth.get("/session", verifySession, async (c) => {
  const sessionId = c.get("sessionId");
  const session = getSession(sessionId);
  return c.json({ sessionId, email: session?.email }, 200);
});

auth.post("/refresh-token", async (c) => {
  let token = getCookie(c, REFRESH_TOKEN_KEY);

  if (!token) {
    const { refreshToken } = await c.req.json();
    token = refreshToken;
  }

  if (!token) {
    return c.json({ message: "Auth required" }, 401);
  }

  const payload = await verifyJwt(token);

  if (!payload) {
    return c.json({ message: "Token expired" }, 403);
  }

  const { email } = payload;
  const session = createSession(email);

  const newAccessToken = await generateJwt({
    email,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
    sessionId: session?.id,
  });

  return c.json({ sessionId: session?.id, accessToken: newAccessToken }, 200);
});

auth.delete("/logout", verifySession, async (c) => {
  const sessionId = c.get("sessionId");

  invalidateSession(sessionId);
  setCookie(c, REFRESH_TOKEN_KEY, "");

  return c.json({ message: "Logged out" }, 200);
});

export { auth };
