import { GetAllParticientsUsecase } from './get-all-particients-usecase'
import { IParticientQueryService } from './get-all-particients-usecase'
import { ParticientDTO } from '../../dto/particient.dto'
import { MembershipStatus } from '@prisma/client'

describe('GetAllParticientsUsecase', () => {
  let usecase: GetAllParticientsUsecase
  let service: IParticientQueryService

  beforeEach(() => {
    service = {
      getAll: jest.fn().mockResolvedValue([]),
    }
    usecase = new GetAllParticientsUsecase(service)
  })

  it('should return all particients', async () => {
    const particients: ParticientDTO[] = [
      new ParticientDTO({
        id: '1',
        name: 'John',
        email: 'john@example.com',
        membershipStatus: MembershipStatus.ACTIVE,
      }),
      new ParticientDTO({
        id: '2',
        name: 'Doe',
        email: 'doe@example.com',
        membershipStatus: MembershipStatus.INACTIVE,
      }),
    ]

    jest.spyOn(service, 'getAll').mockResolvedValue(particients)

    expect(await usecase.do()).toBe(particients)
    expect(service.getAll).toBeCalled()
  })

  it('should throw error when getAll fails', async () => {
    const error = new Error('Failed to fetch particients')
    jest.spyOn(service, 'getAll').mockRejectedValue(error)

    await expect(usecase.do()).rejects.toEqual(error)
    expect(service.getAll).toBeCalled()
  })
})
