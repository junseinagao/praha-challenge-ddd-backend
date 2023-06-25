import { Particient } from '../entity/particient'

export interface IParticientRepository {
  create(particient: Particient): Promise<Particient>
}
