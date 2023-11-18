import { createUuid } from 'src/util/create-uuid'
import { IParticientRepository } from 'src/domain/domain-service/particient'
import { generateInitialTasks } from 'src/util/generate-initial-tasks'
import { Task } from 'src/domain/entity/task'
import { PostCreateParticientDTO } from 'src/dto'
import { IPairRepository } from 'src/domain/domain-service/pair'
import { match } from 'ts-pattern'
import { ParticientForCreate } from 'src/domain/entity/particient-for-create'
import { ITeamRepository } from 'src/domain/domain-service/team'
import { Pair } from 'src/domain/entity/pair'
import { Team } from 'src/domain/entity/team'

export class PostCreateParticientUsecase {
  private readonly particientRepo: IParticientRepository
  private readonly pairRepo: IPairRepository
  private readonly teamRepo: ITeamRepository
  public constructor(
    particientRepo: IParticientRepository,
    pairRepo: IPairRepository,
    teamRepo: ITeamRepository,
  ) {
    this.particientRepo = particientRepo
    this.pairRepo = pairRepo
    this.teamRepo = teamRepo
  }
  public async do(params: PostCreateParticientDTO) {
    const { name, email } = params
    const initialTasks = await generateInitialTasks()

    const [foundPair] = await this.pairRepo.findAssignablePair()
    const pair = match(foundPair)
      .with(undefined, () => null)
      .otherwise((pair) => pair)

    const particientEntity = new ParticientForCreate({
      id: createUuid(),
      name,
      email,
      pair,
      membershipStatus: 'ACTIVE',
      tasks: initialTasks.map(
        (task) =>
          new Task({
            ...task,
            id: createUuid(),
            status: 'TODO',
          }),
      ),
    })

    const createdParticient = await this.particientRepo.create(particientEntity)
    return createdParticient
  }
}
