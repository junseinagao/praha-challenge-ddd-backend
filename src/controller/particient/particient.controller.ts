import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
