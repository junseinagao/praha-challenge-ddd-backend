import { GetParticientResponseDTO } from '../../dto/get-particient-response.dto'

export interface IParticientQueryService {
  getAll(): Promise<GetParticientResponseDTO[]>
}

export class GetAllParticientsUsecase {
  private readonly particientQS: IParticientQueryService
  public constructor(particientQS: IParticientQueryService) {
    this.particientQS = particientQS
  }
  public async do() {
    try {
      return await this.particientQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
