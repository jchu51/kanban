import { Server } from "./interfaces/http/server";
import { TaskController } from "./interfaces/http/task/task-controller";
import { InMemoryTaskRepository } from "./infrastructure/task/in-memory-task-repository";
import {
  GetTaskQueryHandler,
  GetAllTaskQueryHandler,
} from "./application/task/quires/task-query-handlers";
import { TaskQueryService } from "./application/task/services/task-query-service";
import { TaskCommandService } from "./application/task/services/task-command-service";
import {
  CreateTaskCommandHandler,
  DeleteTaskCommandHandler,
  UpdateTaskCommandHandler,
} from "./application/task/commands/task-command-handlers";
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "./application/task/commands/task-commands";
import { GetTaskQuery } from "./application/task/quires/task-quires";
import { InMemoryEventStoreRepository } from "./infrastructure/event-store/in-memory-event-store-repository";
import { startProjectionProcessor } from "./infrastructure/projection/start-projection-processer";
import { TaskProjection } from "./application/task/projections/task-projection";

// infrastructure layer
const inMemoryTaskRepository = new InMemoryTaskRepository();
const inMemoryEventStoreRepository = new InMemoryEventStoreRepository();

// create projections
const taskProjection = new TaskProjection(
  inMemoryEventStoreRepository,
  inMemoryTaskRepository
);
startProjectionProcessor(taskProjection);

// application layer
// Task Service

const getTaskQueryHandler = new GetTaskQueryHandler(taskProjection);
const getAllTaskQueryHandler = new GetAllTaskQueryHandler(taskProjection);

const createTaskCommandHandler = new CreateTaskCommandHandler(
  inMemoryEventStoreRepository
);

const updateTaskCommandHandler = new UpdateTaskCommandHandler(
  inMemoryEventStoreRepository
);

const deleteTaskCommandHandler = new DeleteTaskCommandHandler(
  inMemoryEventStoreRepository
);

const taskQueryService = new TaskQueryService(
  getTaskQueryHandler,
  getAllTaskQueryHandler
);

const taskCommandService = new TaskCommandService(
  createTaskCommandHandler,
  updateTaskCommandHandler,
  deleteTaskCommandHandler
);

// interfaces layer
const taskController = new TaskController(taskQueryService, taskCommandService);
const routers = [taskController];
const server = new Server(routers);

server.listen(8080);

//TEST
const createTaskCommand = new CreateTaskCommand({
  taskId: "1",
  name: "J",
  description: "J",
  status: "J",
  subtasks: [],
});
const createTaskCommand2 = new CreateTaskCommand({
  taskId: "2",
  name: "ben",
  description: "J",
  status: "J",
  subtasks: [],
});
const updateTaskCommand = new UpdateTaskCommand({
  taskId: "1",
  name: "J1",
  description: "J",
  status: "J",
  subtasks: [],
});

const deleteTaskCommand = new DeleteTaskCommand({
  taskId: "2",
});

const getTaskQuery = new GetTaskQuery({
  taskId: "1",
});

(async () => {
  await taskCommandService.createTask(createTaskCommand);
  await taskCommandService.createTask(createTaskCommand2);
  await taskCommandService.updateTask(updateTaskCommand);
  await taskCommandService.deleteTask(deleteTaskCommand);

  const es = await inMemoryEventStoreRepository.getEvents();
  const eType = await inMemoryEventStoreRepository.getEventsByAggregateType(
    "TASK"
  );
  const e = await inMemoryEventStoreRepository.getEventsByAggregateId("2");
})();
