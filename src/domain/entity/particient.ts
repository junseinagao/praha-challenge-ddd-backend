import { MembershipStatus, Pair } from '@prisma/client'
import { Task } from './task'

type ParticientProps = {
  id: string
  name: string
  email: string
  membershipStatus: MembershipStatus
  pairId?: string
  tasks: Task[]
}

export class Particient {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly membershipStatus: MembershipStatus = MembershipStatus.ACTIVE
  public readonly Pair?: Pair
  public readonly pairId?: string
  public readonly tasks: Task[]

  constructor(props: ParticientProps) {
    const { id, name, email, membershipStatus, pairId, tasks } = props
    this.id = id
    this.name = name
    this.email = email
    this.membershipStatus = membershipStatus
    this.pairId = pairId
    this.tasks = tasks
  }

  getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      membershipStatus: this.membershipStatus,
      pairId: this.pairId,
      tasks: this.tasks,
    }
  }
}
