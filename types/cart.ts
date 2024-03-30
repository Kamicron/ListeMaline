import { IProduct } from "./products";
import { IUser } from "./users";

export interface ICart {
  cart_id: number
  cart_name: string
  date_created: Date
  products: IProduct[]
  shared_users: IUser[]
  is_soft_reset: boolean
}