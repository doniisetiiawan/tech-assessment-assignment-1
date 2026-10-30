// Domain entity — pure data + business rules, zero dependencies.
export interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  color: string;
  tone: string;
  storage: string;
  screen: string;
  chip: string;
  camera: string;
  battery: string;
  os: string;
  stock: number;
}
