import { Hono } from "hono";
import { getSales, getSalesStats } from "src/db/sales";
import { verifySession } from "src/utils/session";

const sales = new Hono();

sales.get("/", verifySession, async (c) => {
  const sales = await getSales();
  return c.json(sales, 200);
});

sales.get("/stats", verifySession, async (c) => {
  const salesStats = await getSalesStats();
  return c.json(salesStats, 200);
});

export { sales };
