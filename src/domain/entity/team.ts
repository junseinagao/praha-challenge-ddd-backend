type TeamProps = {
  id: string
  name: string
}

export class Team {
  public readonly id: string
  public readonly name: string

  constructor(props: TeamProps) {
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
