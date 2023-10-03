import { IParticientRepository } from 'src/domain/domain-service/particient'
import { PutChangeMembershipStatusDTO } from 'src/dto'

export class PutChangeMembershipStatusUsecase {
  private readonly particientRepo: IParticientRepository
  public constructor(particientRepo: IParticientRepository) {
    this.particientRepo = particientRepo
  }
  public async do(params: PutChangeMembershipStatusDTO) {
    const { id, membershipStatus } = params

    const createdParticient = await this.particientRepo.changeMembershipStatus(
      id,
      membershipStatus,
    )
    return createdParticient
  }
}
