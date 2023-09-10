import { IParticientRepository } from 'src/domain/domain-service/particient'

import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { MembershipStatus } from '@prisma/client'

export class PutChangeMembershipStatusDTO {
  @ApiProperty()
  @IsString()
  id!: string
  @ApiProperty()
  @IsString()
  @IsEnum(Object.values(MembershipStatus))
  membershipStatus!: string
}

export class PutChangeMembershipStatusUsecase {
  private readonly particientRepo: IParticientRepository
  public constructor(particientRepo: IParticientRepository) {
    this.particientRepo = particientRepo
  }
  public async do(params: PutChangeMembershipStatusDTO) {
    const { id, membershipStatus } = params

    const createdParticient = await this.particientRepo.changeMembershipStatus(
      id,
      membershipStatus as 'ACTIVE' | 'PENDING' | 'INACTIVE', // MEMO: よりよい型付けの方法がないか確認する
    )
    return createdParticient
  }
}
