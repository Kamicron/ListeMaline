import { MessageValidation, Theme, IconPosition } from "@/assets/enum/global";
import { TypeInput } from "@/assets/enum/global";

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
  icon?: {
    position: IconPosition;
    iconCode: string;
    size: number;
  }
}

export interface IInput {
  value: string;
  type: TypeInput;
  color: Theme;
  placeholder: string;
  label?: string;
  error?: string

}

export interface Message {
  id: number;
  text: string;
  type: MessageValidation;
}