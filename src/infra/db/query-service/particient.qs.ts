import { PrismaClient } from '@prisma/client'
import { IParticientQueryService } from 'src/app/particient/get-all-particients-usecase'
import { ParticientDTO } from 'src/app/particient/particient.dto'

export class ParticientQueryService implements IParticientQueryService {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<ParticientDTO[]> {
    const allParticients = await this.prismaClient.particient.findMany()
    return allParticients.map(
      (particientDataModel) =>
        new ParticientDTO({
          ...particientDataModel,
        }),
    )
  }
}
