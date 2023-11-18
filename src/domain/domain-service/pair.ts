import { Pair } from '../entity/pair'

export interface IPairRepository {
  findAssignablePair(): Promise<Pair[]>
}
