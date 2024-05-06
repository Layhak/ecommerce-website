export type FormDataRegister = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
};
export type CartProductType = {
  name: string;
  image: string;
  price: number;
  id: number;
  seller?: string;
  quantity?: number | 0;
  category?: string;
  desc?: string;
  onClick?: () => void;
};

export type FormDataCreate = {
  category: {
    name: string;
    icon: string;
  };
  name: string;
  desc: string;
  image?: string;
  price: string;
  quantity: string;
};
export type FormDataUpdate = {
  readonly id: number;
  category: { name: any };
  name: string;
  desc: string;
  image?: string;
  price: string;
  quantity: string;
  seller: string;
  fileProduct: any;
};

export type ImageType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  category: {
    name: string;
    icon: string;
  };
  name: string;
  price: number;
  quantity: number;
  desc: string;
  image: string;
};

export type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};
export type ModalTypeWithId = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: number;
};

export const BASE_URL = 'https://store.istad.co';
