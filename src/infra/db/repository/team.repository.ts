import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/domain/domain-service/team'
import { Team } from 'src/domain/entity/team'

export class TeamRepository implements ITeamRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async isToBeCreateNewTeam(): Promise<boolean> {
    const { _count } = await this.prismaClient.team.aggregate({
      _count: true,
    })
    const noFoundAnyTeam = _count <= 0
    return noFoundAnyTeam
  }

  async createNewTeam(): Promise<Team> {
    const createdTeamModel = await this.prismaClient.team.create({
      select: { name: true, id: true },
      data: {
        name: '',
      },
    })
    return new Team({
      ...createdTeamModel,
    })
  }
}
