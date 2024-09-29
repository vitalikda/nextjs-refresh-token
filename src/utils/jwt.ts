import { z } from "zod";
import { sign, verify } from "hono/jwt";

const payloadSchema = z.object({
  sessionId: z.string(),
  email: z.string(),
  exp: z.number(),
  role: z.string().optional(),
});

export type Payload = z.infer<typeof payloadSchema>;

export const generateJwt = async (payload: Payload) => {
  return sign(payload, process.env.JWT_SECRET!);
};

export const verifyJwt = async (token?: string) => {
  if (!token) return null;
  try {
    const payload = await verify(token, process.env.JWT_SECRET!);
    return payloadSchema.parse(payload);
  } catch {
    return null;
  }
};
