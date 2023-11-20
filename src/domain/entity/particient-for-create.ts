import { MembershipStatus } from '@prisma/client'
import { IBaseParticient } from './particient'
import { Pair } from './pair'
import { Task } from './task'

type ParticientForCreateProps = {
  id: string
  name: string
  email: string
  membershipStatus: MembershipStatus
  pair: Pair | null
  tasks: Task[]
}

export class ParticientForCreate implements IBaseParticient {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly membershipStatus: MembershipStatus
  public readonly pair: Pair | null
  public readonly tasks: Task[]

  constructor(props: ParticientForCreateProps) {
    const { id, name, email, membershipStatus, pair, tasks } = props
    this.id = id
    this.name = name
    this.email = email
    this.membershipStatus = membershipStatus
    this.pair = pair ?? null
    this.tasks = tasks
  }

  getProperties() {
    // MEMO: 新しく Pair を作成するとき
    if (this.pair === null) {
      return {
        isNewPair: true,
        name: this.name,
        email: this.email,
        membershipStatus: this.membershipStatus,
        pair: {
          id: '',
          name: '',
        },
        team: {
          id: '',
          name: '',
        },
        tasks: this.tasks,
      }
    }
    return {
      isNewPair: false,
      name: this.name,
      email: this.email,
      membershipStatus: this.membershipStatus,
      pair: {
        id: this.pair.id,
        name: this.pair.name,
      },
      team: {
        id: this.pair.team.id,
        name: this.pair.team.name,
      },
      tasks: this.tasks,
    }
  }
}
