import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { MembershipStatus } from '@prisma/client'

export class Particient {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: String })
  email: string

  @ApiProperty({ enum: MembershipStatus, enumName: 'MembershipStatus' })
  membership_status: MembershipStatus = MembershipStatus.ACTIVE

  @ApiPropertyOptional({ type: String })
  pair_id?: string
  public constructor(params: {
    id: string
    name: string
    email: string
    membershipStatus: MembershipStatus
    pairId?: string
  }) {
    const { id, name, email, membershipStatus, pairId } = params
    this.id = id
    this.name = name
    this.email = email
    this.membership_status = membershipStatus
    this.pair_id = pairId
  }
}
