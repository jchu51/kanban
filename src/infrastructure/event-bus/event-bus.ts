import { Event } from "../event";

/**
 * The EventBus class maintains a dictionary of event name keys to an array of event handler functions.
 * The subscribe method takes an event name and a handler function and adds the handler to the list of
 * handlers for that event.
 * The publish method takes an event and invokes all the handlers that are subscribed to the event name.
 */

export class EventBus {
  private subscribers: Record<string, Array<(event: Event) => Promise<void>>> =
    {};

  public subscribe(
    eventName: string,
    handler: (event: Event) => Promise<void>
  ) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }

    this.subscribers[eventName].push(handler);
  }

  public async publish(event: Event) {
    const handlers = this.subscribers[event.eventType] ?? [];

    for (const handler of handlers) {
      await handler(event);
    }
  }
}
