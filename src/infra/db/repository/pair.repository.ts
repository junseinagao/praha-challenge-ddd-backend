import { PrismaClient } from '@prisma/client'
import { IPairRepository } from 'src/domain/domain-service/pair'
import { Pair } from 'src/domain/entity/pair'
import { Team } from 'src/domain/entity/team'

export class PairRepository implements IPairRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  async findAssignablePair(): Promise<Pair[]> {
    const pairs = await this.prismaClient.pair.findMany({
      select: {
        _count: {
          select: {
            particients: true,
          },
        },
        id: true,
        name: true,
        team: true,
      },
      distinct: ['teamId'],
    })

    const beAssignablePair = pairs.filter(
      (pair) => pair._count.particients <= 2,
    )

    return beAssignablePair.map(
      (pair) =>
        new Pair({
          id: pair.id,
          name: pair.name,
          team: new Team({
            id: pair.team.id,
            name: pair.team.name,
          }),
        }),
    )
  }
}
