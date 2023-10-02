import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { GetAllParticientsResponse } from './get-all-particients-response'
import { ParticientQueryService } from 'src/infra/db/query-service/particient.qs'
import { GetAllParticientsUsecase } from 'src/app/particient/get-all-particients-usecase'
import { ParticientRepository } from 'src/infra/db/repository/particient.repository'
import {
  PostCreateParticientDTO,
  PostCreateParticientUsecase,
} from 'src/app/particient/post-create-particient'
import { Particient } from './particient-schema'
import { GetParticientResponse } from './get-particient-response'
import {
  PutChangeMembershipStatusDTO,
  PutChangeMembershipStatusUsecase,
} from 'src/app/particient/put-change-membership-status-usecase'
import { PutChangeParticientTaskStatusDTO } from 'src/app/particient-task/particient-task.dto'

@Controller({
  path: '/particients',
})
export class ParticientController {
  @Get()
  @ApiResponse({ status: 200, type: GetAllParticientsResponse })
  async getAllParticients(): Promise<GetAllParticientsResponse> {
    const prisma = new PrismaClient()
    const qs = new ParticientQueryService(prisma)
    const usecase = new GetAllParticientsUsecase(qs)
    const particients = await usecase.do()
    const response = new GetAllParticientsResponse({ particients })
    return response
  }

  @Post()
  async postCreateParticient(
    @Body() postCreateParticientDto: PostCreateParticientDTO,
  ): Promise<Particient> {
    const prisma = new PrismaClient()
    const repo = new ParticientRepository(prisma)
    const usecase = new PostCreateParticientUsecase(repo)
    const particient = await usecase.do({
      name: postCreateParticientDto.name,
      email: postCreateParticientDto.email,
    })
    const response = new GetParticientResponse({ particient })
    return response
  }

  @Put('/membership-status')
  async putChangeMembershipStatus(
    @Body() putChangeMembershipStatusDTO: PutChangeMembershipStatusDTO,
  ): Promise<Particient> {
    const prisma = new PrismaClient()
    const repo = new ParticientRepository(prisma)
    const usecase = new PutChangeMembershipStatusUsecase(repo)
    const particient = await usecase.do({
      id: putChangeMembershipStatusDTO.id,
      membershipStatus: putChangeMembershipStatusDTO.membershipStatus,
    })
    const response = new GetParticientResponse({ particient })
    return response
  }

  @Get(':id/tasks')
  async getParticientTasks() {
    throw new NotImplementedException()
  }

  @Put(':id/tasks/:taskId')
  async updateParticientTaskStatus(
    @Body() putChangeParticientTaskStatusDTO: PutChangeParticientTaskStatusDTO,
  ) {
    throw new NotImplementedException()
  }
}
