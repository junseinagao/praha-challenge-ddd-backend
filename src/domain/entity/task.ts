import { TaskStatus } from '@prisma/client'

type TaskProps = {
  id: string
  name: string
  status: TaskStatus
}

export class Task {
  public readonly id: string
  public readonly name: string
  public readonly status: TaskStatus

  constructor(props: TaskProps) {
    const { id, name, status } = props
    this.id = id
    this.name = name
    this.status = status
  }

  getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
    }
  }
}
