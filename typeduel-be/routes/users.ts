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
      return res.status(201).json({ user: { ...req.body, id: userId } });
    } catch (e: any) {
      console.error(e);

      return res.status(400).json({ error: e.message });
    }
  });

router.route("/users/:name").get(async (req, res) => {
  try {
    const user = await getUserByName(req.params.name);
    if (user) {
      return res.json({ user });
    }

    return res.status(404).json({ error: "user not found" });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
});
