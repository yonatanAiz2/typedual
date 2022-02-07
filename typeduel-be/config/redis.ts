import { Client } from "redis-om";
import type { Request, Response, NextFunction } from "express";

type ExpressRoute = (
  request: Request,
  response: Response,
  next?: NextFunction
) => void;

export const client = new Client();

export async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

export async function disconnect() {
  if (client.isOpen()) {
    await client.close();
  }
}

export async function redisConnectionMiddleware(
  _: Request,
  res: Response,
  next: NextFunction
) {
  await connect();

  // res.on("finish", async function () {
  //   await disconnect();
  // });

  next();
}
