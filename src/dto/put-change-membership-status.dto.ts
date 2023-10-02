import { ApiProperty } from '@nestjs/swagger'
import { MembershipStatus } from '@prisma/client'
import { IsString, IsEnum } from 'class-validator'

export class PutChangeMembershipStatusDTO {
  @ApiProperty()
  @IsString()
  id!: string
  @ApiProperty()
  @IsString()
  @IsEnum(Object.values(MembershipStatus))
  membershipStatus!: string
}
