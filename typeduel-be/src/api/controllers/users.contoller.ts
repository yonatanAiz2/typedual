import { createUser, fetchUserByName } from "../service/users.service";

function isUserValid(userData: User) {
  if (!userData.name) {
    return false;
  }

  return true;
}

export async function createNewUser(user: User) {
  if (!isUserValid(user)) {
    console.error(user, "NOT VALID!");
    throw new Error("user not valid");
  }
  const existingUser = await fetchUserByName(user.name);

  if (existingUser) {
    throw new Error("user exists");
  }
  const id = await createUser(user);
  return id;
}

export async function getUserByName(name: string) {
  if (name) {
    const user = await fetchUserByName(name);
    return user;
  }

  throw new Error("user not valid");
}
