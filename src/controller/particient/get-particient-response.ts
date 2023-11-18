import { GetParticientResponseDTO } from 'src/dto/get-particient-response.dto'
import { Particient } from './particient-schema'

export class GetParticientResponse extends Particient {
  constructor(particient: GetParticientResponseDTO) {
    super(particient)
  }
}
