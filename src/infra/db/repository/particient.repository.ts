import { PrismaClient } from '@prisma/client'
import { IParticientRepository } from 'src/domain/domain-service/particient'
import { Particient } from 'src/domain/entity/particient'
import { Task } from 'src/domain/entity/task'

export class ParticientRepository implements IParticientRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async create(particientEntity: Particient): Promise<Particient> {
    const { id, name, email, membershipStatus, pairId, tasks } =
      particientEntity.getAllProperties()

    const createdParticientDatamodel =
      await this.prismaClient.particient.create({
        select: {
          id: true,
          name: true,
          email: true,
          membershipStatus: true,
          pairId: true,
          tasks: true,
        },
        data: {
          id,
          name,
          email,
          membershipStatus: membershipStatus,
          pairId: pairId,
          tasks: {
            create: tasks,
          },
        },
      })
    const createdParticientEntity = new Particient({
      ...createdParticientDatamodel,
      pairId: createdParticientDatamodel.pairId ?? undefined,
      tasks: createdParticientDatamodel.tasks.map((task) => new Task(task)),
    })
    return createdParticientEntity
  }
}
