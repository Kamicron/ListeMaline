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

export interface IFontAwesomeIcon {
  position: IconPosition;
  iconCode: string;
  size: number;
}

export interface IButton {
  display: string;
  icon?: IFontAwesomeIcon
}

export interface IOption<T> {
  value: T;
  label: string;
}

export interface IInput<T> {
  type: TypeInput;
  color: Theme;
  placeholder: string;
  label?: string;
  error?: {
    display: string;
    enable: boolean;
  }
  icon?: IFontAwesomeIcon;
  option?: IOption<T>[]; 
}

export interface Message {
  id: number;
  text: string;
  type: MessageValidation;
}