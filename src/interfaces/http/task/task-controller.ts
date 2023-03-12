import { Router, Request, Response } from "express";
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "../../../application/task/commands/task-commands";
import { GetTaskQuery } from "../../../application/task/quires/task-quires";
import { TaskCommandService } from "../../../application/task/services/task-command-service";
import { TaskQueryService } from "../../../application/task/services/task-query-service";
import { Controller } from "../shared/controller/controller";
import taskErrorHandler from "./task-error-handler";
import { HttpStatus } from "../shared/httpStatus";

export class TaskController implements Controller {
  readonly prefixPath: string = "/task";

  constructor(
    private readonly taskQueryService: TaskQueryService,
    private readonly taskCommandService: TaskCommandService
  ) {}

  createRouter = (): Router => {
    const taskRouter = Router();

    return taskRouter
      .get("", taskErrorHandler(this.getAllTaskById))
      .post("", taskErrorHandler(this.createTask))
      .get("/:taskId", taskErrorHandler(this.getTaskById))
      .put("/:taskId", taskErrorHandler(this.updateTask))
      .delete("/:taskId", taskErrorHandler(this.deleteTask));
  };

  getAllTaskById = async (_req: Request, res: Response) => {
    const tasks = await this.taskQueryService.getAllTasks();
    return res.status(HttpStatus.OK).json(tasks);
  };

  getTaskById = async (req: Request, res: Response) => {
    const query = new GetTaskQuery({ taskId: req.params.taskId });
    const task = await this.taskQueryService.getTask(query);

    return res.status(HttpStatus.OK).json(task);
  };

  createTask = async (req: Request, res: Response) => {
    const command = new CreateTaskCommand({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      subtasks: req.body.subtasks,
    });

    const task = await this.taskCommandService.createTask(command);

    return res.status(HttpStatus.CREATED).json(task);
  };

  updateTask = async (req: Request, res: Response) => {
    const command = new UpdateTaskCommand({
      taskId: req.params.taskId,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      subtasks: req.body.subtasks,
    });

    const task = await this.taskCommandService.updateTask(command);

    return res.status(HttpStatus.ACCEPTED).json(task);
  };

  deleteTask = async (req: Request, res: Response) => {
    const command = new DeleteTaskCommand({
      taskId: req.params.taskId,
    });

    const task = await this.taskCommandService.deleteTask(command);

    return res.status(HttpStatus.OK).json(task);
  };
}
