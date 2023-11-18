import { Team } from './team'

export interface IBasePair {
  readonly id: string
  readonly name: string
}

type PairProps = {
  id: string
  name: string
  team: Team
}

export class Pair implements IBasePair {
  public readonly id: string
  public readonly name: string
  public readonly team: Team

  constructor(props: PairProps) {
    const { id, name, team } = props
    this.id = id
    this.name = name
    this.team = team
  }

  getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      team: this.team,
    }
  }

  validate() {
    // 英字一字であることを確認する
    return this.name.match(/^[a-zA-Z]+$/)
  }
}
