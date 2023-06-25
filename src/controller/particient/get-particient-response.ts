import { ParticientDTO } from 'src/app/particient/particient.dto'
import { Particient } from './particient-schema'

export class GetParticientResponse extends Particient {
  constructor(params: { particient: ParticientDTO }) {
    super(params.particient)
  }
}
