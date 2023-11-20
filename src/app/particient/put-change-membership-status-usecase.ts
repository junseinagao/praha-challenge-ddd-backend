import { IParticientRepository } from 'src/domain/domain-service/particient'
import { PutChangeMembershipStatusDTO } from 'src/dto'

export class PutChangeMembershipStatusUsecase {
  private readonly particientRepo: IParticientRepository
  public constructor(particientRepo: IParticientRepository) {
    this.particientRepo = particientRepo
  }
  public async do(params: PutChangeMembershipStatusDTO) {
    const { id } = params
    const particient = await this.particientRepo.get(id)
    const updaredParticient = await this.particientRepo.save(particient)
    return updaredParticient
  }
}
