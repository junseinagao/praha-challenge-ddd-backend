import { MembershipStatus } from '@prisma/client'

export class ParticientDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly membershipStatus: MembershipStatus
  public constructor(params: {
    id: string
    name: string
    email: string
    membershipStatus: string
  }) {
    const { id, name, email, membershipStatus } = params
    this.id = id
    this.name = name
    this.email = email
    this.membershipStatus = membershipStatus as MembershipStatus
  }
}
