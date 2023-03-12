import { v4 as uuidv4 } from "uuid";

export abstract class AggregateRoot {
  public id: string;

  constructor(id?: string) {
    this.id = id ?? uuidv4();
  }
}
