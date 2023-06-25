import { Module } from '@nestjs/common'
import { ParticientController } from './controller/particient/particient.controller'

@Module({
  imports: [],
  controllers: [ParticientController],
  providers: [],
})
export class AppModule {}
