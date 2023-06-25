import { createUuid } from 'src/util/create-uuid'
import { IParticientRepository } from 'src/domain/domain-service/particient'
import { Particient } from 'src/domain/entity/particient'
import { generateInitialTasks } from 'src/util/generate-initial-tasks'
import { Task } from 'src/domain/entity/task'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class PostCreateParticientDTO {
  @ApiProperty()
  @IsString()
  name!: string
  @ApiProperty()
  @IsEmail()
  email!: string
}

export class PostCreateParticientUsecase {
  private readonly particientRepo: IParticientRepository
  public constructor(particientRepo: IParticientRepository) {
    this.particientRepo = particientRepo
  }
  public async do(params: PostCreateParticientDTO) {
    const { name, email } = params

    const initialTasks = await generateInitialTasks()
    const particientEntity = new Particient({
      id: createUuid(),
      name,
      email,
      membershipStatus: 'ACTIVE',
      pairId: undefined,
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
