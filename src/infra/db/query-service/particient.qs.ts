import { PrismaClient } from '@prisma/client'
import { IParticientQueryService } from 'src/app/particient/get-all-particients-usecase'
import { GetParticientResponseDTO } from 'src/dto/get-particient-response.dto'

export class ParticientQueryService implements IParticientQueryService {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<GetParticientResponseDTO[]> {
    const allParticients = await this.prismaClient.particient.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        membershipStatus: true,
      },
    })

    return allParticients.map(
      (particientDataModel) =>
        new GetParticientResponseDTO({
          ...particientDataModel,
        }),
    )
  }
}
