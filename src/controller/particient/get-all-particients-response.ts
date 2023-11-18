import { ApiProperty } from '@nestjs/swagger'
import { MembershipStatus } from '@prisma/client'
import { Particient } from './particient-schema'
import { GetParticientResponseDTO } from 'src/dto/get-particient-response.dto'

export class GetAllParticientsResponse {
  @ApiProperty({ type: () => [Particient] })
  particients: Particient[]

  public constructor(params: { particients: GetParticientResponseDTO[] }) {
    const { particients } = params
    this.particients = particients.map(
      ({ id, name, email, membershipStatus }) => {
        return new Particient({
          id,
          name,
          email,
          membershipStatus: membershipStatus as MembershipStatus,
          pairId: undefined,
        })
      },
    )
  }
}
