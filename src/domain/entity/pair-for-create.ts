import { IBasePair } from './pair'

type PairProps = {
  id: string
  name: string
}

export class PairForCreate implements IBasePair {
  public readonly id: string
  public readonly name: string

  constructor(props: PairProps) {
    const { id, name } = props
    this.id = id
    this.name = name
  }

  getAllProperties() {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
