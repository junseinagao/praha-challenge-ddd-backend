import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail } from 'class-validator'

export class PostCreateParticientDTO {
  @ApiProperty()
  @IsString()
  name!: string
  @ApiProperty()
  @IsEmail()
  email!: string
}
