import { MembershipStatus } from '@prisma/client'
import { Particient } from '../entity/particient'

export interface IParticientRepository {
  create(particient: Particient): Promise<Particient>
  get(id: string): Promise<Particient>
  changeMembershipStatus(
    id: string,
    membershipStatus: MembershipStatus,
  ): Promise<Particient>
}
