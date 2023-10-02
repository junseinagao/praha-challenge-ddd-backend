import { ApiProperty } from '@nestjs/swagger'
import { TaskStatus } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class PutChangeParticientTaskStatusDTO {
  @ApiProperty()
  @IsEnum(Object.values(TaskStatus))
  status!: TaskStatus
}
