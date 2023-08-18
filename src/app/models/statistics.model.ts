export interface StatisticsModel {
  id: string;
  userDNI: string;
  longitude: number;
  latitude: number;
  registerDate: string;
  user: UserStatisticsModel;
}

export interface UserStatisticsModel {
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  active: boolean;
}
