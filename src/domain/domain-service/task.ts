import { Task } from '../entity/task'

export interface ITaskRepository {
  create(particient: Task): Promise<Task>
}
