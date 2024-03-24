export interface ICategory {
  id: number;
  name: string;
  icon: string;
}

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  description: string;
  price: string;
  user_id: number;
}