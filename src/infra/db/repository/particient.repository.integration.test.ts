import { prisma } from '@testUtil/prisma'
import { ParticientRepository } from './particient.repository'
import { Particient } from 'src/domain/entity/particient'
import { Task } from 'src/domain/entity/task'
import { TaskStatus, MembershipStatus } from '@prisma/client'
import { createUuid } from 'src/util/create-uuid'

describe('particient-repository.integration', () => {
  const particientRepo = new ParticientRepository(prisma)

  beforeAll(async () => {
    await prisma.particient.deleteMany({})
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('create', () => {
    afterEach(async () => {
      await prisma.task.deleteMany({})
      await prisma.particient.deleteMany({})
    })

    it('should be able to save a particient', async () => {
      const particientId = createUuid()
      const tasks: Task[] = [
        new Task({ id: '1', name: 'Task 1', status: TaskStatus.TODO }),
      ]

      const particientExpected = {
        id: particientId,
        name: 'John',
        email: 'john@example.com',
        membershipStatus: MembershipStatus.ACTIVE,
        pairId: undefined,
        tasks: tasks,
      }

      await particientRepo.create(new Particient(particientExpected))

      const allParticients = await prisma.particient.findMany({
        include: { tasks: true },
      })
      expect(allParticients).toHaveLength(1)
      expect(allParticients[0]).toEqual(
        expect.objectContaining({
          email: 'john@example.com',
          id: particientId,
          membershipStatus: 'ACTIVE',
          name: 'John',
          pairId: null,
          tasks: [
            {
              id: '1',
              name: 'Task 1',
              particientId: particientId,
              status: 'TODO',
            },
          ],
        }),
      )
    })
  })
})
