import { MembershipStatus, PrismaClient } from '@prisma/client'
import { IParticientRepository } from 'src/domain/domain-service/particient'
import { Particient } from 'src/domain/entity/particient'
import { Task } from 'src/domain/entity/task'

export class ParticientRepository implements IParticientRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async get(id: string) {
    const particientDataModel = await this.prismaClient.particient.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        membershipStatus: true,
        pairId: true,
        tasks: true,
      },
      where: { id },
    })
    if (!particientDataModel) throw new Error('Particient not found')
    return new Particient({
      ...particientDataModel,
      pairId: particientDataModel.pairId ?? undefined,
      tasks: particientDataModel.tasks.map((task) => new Task(task)),
    })
  }

  public async changeMembershipStatus(
    id: string,
    membershipStatus: MembershipStatus,
  ): Promise<Particient> {
    const particient = await this.get(id) // MEMO: N+1 を書いたが、membershipStatus の更新時に particient を新しく作るだけのデータをSelectするべきか確認する
    const updatedParticientDataModel =
      await this.prismaClient.particient.update({
        select: { id: true, membershipStatus: true },
        where: { id },
        data: { membershipStatus: membershipStatus },
      })
    return new Particient({ ...particient, ...updatedParticientDataModel })
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
