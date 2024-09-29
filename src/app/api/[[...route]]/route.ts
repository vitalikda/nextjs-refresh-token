import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "./authRoute";
import { sales } from "./salesRoute";

export const runtime = "edge";

const api = new Hono().basePath("/api");

api.get("/test", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

api.route("/auth", auth);
api.route("/sales", sales);

export const GET = handle(api);
export const POST = handle(api);
export const DELETE = handle(api);
