export interface UserModel {
  dni: string;
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  active: boolean;
  incidents: number;
  lastIncident: Date;
}
