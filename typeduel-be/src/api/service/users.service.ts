import { Repository } from "redis-om";
import { client } from "../../config/redis";
import { userSchema } from "../models/users.model";

export async function createUser(data: User) {
  const repository = new Repository(userSchema, client);

  // @ts-ignore
  const user = repository.createEntity(data);

  const id = await repository.save(user);
  return { ...data, id };
}

export async function fetchUserByName(name: string) {
  const repository = new Repository(userSchema, client);

  const user = await repository
    .search()
    .where("name")
    .matches(name)
    .returnFirst();
  return user;
}
