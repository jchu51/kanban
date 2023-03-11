import { Event } from "../event";
import { EventStoreRepository } from "./event-store";

export class InMemoryEventStoreRepository implements EventStoreRepository {
  private events: Event[];
  constructor() {
    this.events = [];
  }

  save = async (event: Event): Promise<void> => {
    this.events.push(event);
  };

  getEvents = async (): Promise<Event[]> => {
    return this.events;
  };

  getEventsByAggregateType = async (
    aggregateType: string
  ): Promise<Event[]> => {
    return this.events.filter((event) => event.aggregateType === aggregateType);
  };

  getEventsByAggregateId = async (aggregateId: string): Promise<Event[]> => {
    return this.events.filter((event) => event.aggregateId === aggregateId);
  };

  clear = async (): Promise<void> => {
    this.events = [];
  };

  subscribeToStream = async (
    aggregateType: "TASK",
    bookmark: number,
    cb: (event: any) => Promise<void>
  ) => {
    const events = await this.getEventsByAggregateType(aggregateType);

    for (let position = bookmark; position < events.length; position++) {
      cb(events[position]);
    }
  };
}
