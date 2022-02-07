import { createUser, fetchUserByName } from "../service/users";

function isUserValid(userData: User) {
  if (!userData.name) {
    return false;
  }

  return true;
}

export async function createNewUser(user: User) {
  if (isUserValid(user)) {
    const id = await createUser(user);
    return id;
  }

  throw new Error("user not valid");
}

export async function getUserByName(name: string) {
  if (name) {
    const user = await fetchUserByName(name);
    return user;
  }

  throw new Error("user not valid");
}
