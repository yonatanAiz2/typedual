import express from "express";
import { redisConnectionMiddleware } from "../config/redis";
import { createNewUser, getUserByName } from "../controllers/users";
export const router = express.Router();

router.use(redisConnectionMiddleware);

router
  .route("/users")
  .get(function (_, res) {
    return res.send("USERS");
  })
  .post(async function (req, res) {
    try {
      const userId = await createNewUser(req.body);
      return res.json({ user: { ...req.body, id: userId } }).status(201);
    } catch (e: any) {
      console.error(e);

      return res.json({ error: e.message }).status(400);
    }
  });

router.route("/users/:name").get(async (req, res) => {
  try {
    const user = await getUserByName(req.params.name);
    return res.json({ user });
  } catch (e: any) {
    return res.json({ error: e.message }).status(400);
  }
});
