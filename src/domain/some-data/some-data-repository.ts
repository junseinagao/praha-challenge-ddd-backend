import { SomeData } from 'src/domain/some-data/some-data'

export interface ISomeDataRepository {
  save(someData: SomeData): Promise<SomeData>
}
