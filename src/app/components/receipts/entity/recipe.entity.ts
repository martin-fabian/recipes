export interface RecipeEntity {
  id: number;
  name: string;
  category: string;
  img: string;
  content: string;
  createdTimeDate?: Date;
  createdBy?: string;
}
