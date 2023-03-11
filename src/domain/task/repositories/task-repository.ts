import { TaskAggregate } from "../aggregate/task-aggregates";

/* should only have read function, 
In event-sourced domain model pattern, the main source of truth is the event store, 
which stores all events that have occurred in the system. 

so we dont need to actually saved the data in to DB
*/
export interface TaskRepository {
  save: (task: TaskAggregate) => Promise<TaskAggregate>;
  delete: (taskId: string) => Promise<void>;
  findAll: () => Promise<TaskAggregate[]>;
  findById: (taskId: string) => Promise<TaskAggregate | undefined>;
}
