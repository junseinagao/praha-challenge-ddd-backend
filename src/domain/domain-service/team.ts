import { Team } from '../entity/team'

export interface ITeamRepository {
  isToBeCreateNewTeam(): Promise<boolean>
  createNewTeam(): Promise<Team>
}
