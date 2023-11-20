import { Particient } from '../entity/particient'
import { ParticientForCreate } from '../entity/particient-for-create'

export interface IParticientRepository {
  create(particient: ParticientForCreate): Promise<Particient>
  get(id: string): Promise<Particient>
  save(particient: Particient): Promise<Particient>
}
