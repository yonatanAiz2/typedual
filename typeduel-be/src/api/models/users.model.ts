import { Entity, Schema } from "redis-om";

class User extends Entity {}
export const userSchema = new Schema(
  User,
  {
    name: { type: "string", textSearch: true },
    wins: { type: "number" },
  },
  { dataStructure: "JSON" }
);
