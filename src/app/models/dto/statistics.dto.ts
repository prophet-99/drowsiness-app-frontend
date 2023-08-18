import { StatisticsModel } from '../statistics.model';

export interface StatisticsDTO extends StatisticsModel {
  siteAddress: string;
}
