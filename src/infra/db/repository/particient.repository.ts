import { PrismaClient } from '@prisma/client'
import { IParticientRepository } from 'src/domain/domain-service/particient'
import { Pair } from 'src/domain/entity/pair'
import { Particient } from 'src/domain/entity/particient'
import { ParticientForCreate } from 'src/domain/entity/particient-for-create'
import { Task } from 'src/domain/entity/task'
import { Team } from 'src/domain/entity/team'
import { match } from 'ts-pattern'

export class ParticientRepository implements IParticientRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async create(
    particientEntity: ParticientForCreate,
  ): Promise<Particient> {
    const { isNewPair, name, email, membershipStatus, pair, team, tasks } =
      particientEntity.getProperties()

    const createdParticientDataModel = await match(isNewPair)
      .with(true, () =>
        this.prismaClient.particient.create({
          select: {
            id: true,
            name: true,
            email: true,
            membershipStatus: true,
            tasks: true,
            pair: {
              select: {
                id: true,
                name: true,
                team: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          data: {
            name,
            email,
            membershipStatus: membershipStatus,
            pair: {
              create: {
                name: pair.name,
                team: {
                  connectOrCreate: {
                    where: {
                      id: team.id,
                    },
                    create: {
                      name: team.name,
                    },
                  },
                },
              },
            },
            tasks: {
              create: tasks,
            },
          },
        }),
      )
      .with(false, () =>
        this.prismaClient.particient.create({
          select: {
            id: true,
            name: true,
            email: true,
            membershipStatus: true,
            tasks: true,
            pair: {
              select: {
                id: true,
                name: true,
                team: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          data: {
            name,
            email,
            membershipStatus: membershipStatus,
            pair: {
              connect: {
                id: pair.id,
              },
            },
            tasks: {
              create: tasks,
            },
          },
        }),
      )
      .exhaustive()

    if (!createdParticientDataModel.pair) throw new Error('Pair not found')
    if (!createdParticientDataModel.pair.team) throw new Error('Team not found')

    return new Particient({
      id: createdParticientDataModel.id,
      name: createdParticientDataModel.name,
      email: createdParticientDataModel.email,
      membershipStatus: createdParticientDataModel.membershipStatus,
      pair: new Pair({
        id: createdParticientDataModel.pair.id,
        name: createdParticientDataModel.pair.name,
        team: new Team({
          id: createdParticientDataModel.pair.team.id,
          name: createdParticientDataModel.pair.team.name,
        }),
      }),
      tasks,
    })
  }

  public async get(id: string) {
    const particientDataModel = await this.prismaClient.particient.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        membershipStatus: true,
        tasks: true,
        pair: {
          select: {
            id: true,
            name: true,
            team: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: { id },
    })
    if (particientDataModel === null) throw new Error('Particient not found')
    if (particientDataModel.pair === null) throw new Error('Pair not found')
    if (particientDataModel.pair.team === null)
      throw new Error('Team not found')
    return new Particient({
      id: particientDataModel.id,
      name: particientDataModel.name,
      email: particientDataModel.email,
      membershipStatus: particientDataModel.membershipStatus,
      pair: new Pair({
        id: particientDataModel.pair.id,
        name: particientDataModel.pair.name,
        team: new Team({
          id: particientDataModel.pair.team.id,
          name: particientDataModel.pair.team.name,
        }),
      }),
      tasks: particientDataModel.tasks.map((task) => new Task(task)),
    })
  }

  public async save(particient: Particient): Promise<Particient> {
    if (particient.pair === null) throw new Error('Pair not found')
    if (particient.pair?.team === null) throw new Error('Team not found')

    const updatedParticientDataModel =
      await this.prismaClient.particient.update({
        select: {
          id: true,
          name: true,
          email: true,
          membershipStatus: true,
          tasks: true,
          pair: {
            select: {
              id: true,
              name: true,
              team: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: { id: particient.id },
        data: {
          id: particient.id,
          email: particient.email,
          membershipStatus: particient.membershipStatus,
          name: particient.name,
          pair: {
            update: {
              name: particient.pair.name,
              team: {
                update: {
                  name: particient.pair.team.name,
                },
              },
            },
          },
        },
      })

    if (updatedParticientDataModel.pair === null)
      throw new Error('Pair not found')
    if (updatedParticientDataModel.pair.team === null)
      throw new Error('Team not found')

    return new Particient({
      id: updatedParticientDataModel.id,
      name: updatedParticientDataModel.name,
      email: updatedParticientDataModel.email,
      membershipStatus: updatedParticientDataModel.membershipStatus,
      pair: new Pair({
        id: updatedParticientDataModel.pair.id,
        name: updatedParticientDataModel.pair.name,
        team: new Team({
          id: updatedParticientDataModel.pair.team.id,
          name: updatedParticientDataModel.pair.team.name,
        }),
      }),
      tasks: updatedParticientDataModel.tasks.map((task) => new Task(task)),
    })
  }

  public async getAllPairs(): Promise<Pair[]> {
    const allPairs = await this.prismaClient.pair.findMany({
      select: {
        _count: {
          select: {
            particients: true,
          },
        },
        id: true,
        name: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return allPairs.map(
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
