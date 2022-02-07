import { Repository } from "redis-om";
import { client } from "../config/redis";
import { userSchema } from "../models/users";

export async function createUser(data: User) {
  const repository = new Repository(userSchema, client);

  // @ts-ignore
  const user = repository.createEntity(data);

  const id = await repository.save(user);
  return id;
}

export async function fetchUserByName(name: string) {
  const repository = new Repository(userSchema, client);

  // @ts-ignore
  const user = await repository.search(name).returnFirst();
  return user;
}
