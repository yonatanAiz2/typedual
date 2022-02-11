import { Entity, Schema } from "redis-om";

class Game extends Entity {}
export const gameSchema = new Schema(
  Game,
  {
    challenger: { type: "string" },
    accepter: { type: "string" },
    letters: { type: "number" },
  },
  { dataStructure: "JSON" }
);
