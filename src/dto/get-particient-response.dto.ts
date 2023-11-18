import { MembershipStatus, Prisma } from '@prisma/client'

export class GetParticientResponseDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly membershipStatus: MembershipStatus
  public constructor(
    params: Prisma.ParticientGetPayload<{
      select: {
        id: true
        name: true
        email: true
        membershipStatus: true
      }
    }>,
  ) {
    const { id, name, email, membershipStatus } = params
    this.id = id
    this.name = name
    this.email = email
    this.membershipStatus = membershipStatus as MembershipStatus
  }
}
