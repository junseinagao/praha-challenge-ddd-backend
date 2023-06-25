import { InitialTasks } from './initial-tasks'

type Task = {
  name: string
}

export const generateInitialTasks = async (): Promise<Task[]> => {
  return InitialTasks
}
