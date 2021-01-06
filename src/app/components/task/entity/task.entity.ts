export interface TaskEntity {
  id: number;
  leftColumn: Array<string>;
  rightColumn?: Array<string>;
  user: string;
}
