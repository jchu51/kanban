import { Event } from "../event";

export interface EventStoreRepository {
  save(events: Event): Promise<void>;
  getEvents(): Promise<Event[]>;
  getEventsByAggregateType(aggregateType: string): Promise<Event[]>;
  getEventsByAggregateId(aggregateId: string): Promise<Event[]>;
  clear(): Promise<void>;
}

// CREATE TABLE event_store (
//   id SERIAL PRIMARY KEY,
//   aggregate_id VARCHAR(255) NOT NULL,
//   aggregate_type VARCHAR(255) NOT NULL,
//   event_type VARCHAR(255) NOT NULL,
//   event_data JSONB NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

// CREATE INDEX event_store_aggregate_id_idx ON event_store (aggregate_id);
// CREATE INDEX event_store_aggregate_type_idx ON event_store (aggregate_type);

// This script creates a table named event_store with the following columns:

// id: A unique identifier for each event in the event store.
// aggregate_id: The identifier of the aggregate root that this event belongs to.
// aggregate_type: The type of the aggregate root that this event belongs to.
// event_type: The type of the event.
// event_data: A JSONB column containing the serialized data of the event.
// created_at: The timestamp when the event was created.
// It also creates two indexes on the aggregate_id and aggregate_type columns to optimize queries based on those columns.

// This SQL command creates an index named event_store_aggregate_id_idx on the aggregate_id column of the event_store table.

// An index is a database object that improves the speed of data retrieval operations on a table. When an index is created on a column, the database creates a separate data structure that contains the indexed column's values and a pointer to the record that contains each value. This structure is optimized for fast search operations, allowing the database to quickly locate records that match a particular value or range of values.

// In this case, creating an index on the aggregate_id column of the event_store table allows the database to quickly retrieve all events that belong to a particular aggregate by performing an index lookup on the aggregate ID. This can significantly improve the performance of event retrieval operations, especially when working with large event stores containing many events.
