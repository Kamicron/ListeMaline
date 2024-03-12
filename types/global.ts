import { Theme } from "../assets/enum/global";

// types/global.ts
export interface Product {
  id: number;
  name: string;
  description: string
  price: number;
  category: string;
}

export interface Category {
  id: number;
  name: string;
}


export interface IButton {
  display: string;
  color: Theme;
}