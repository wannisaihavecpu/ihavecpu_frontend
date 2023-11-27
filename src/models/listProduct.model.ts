interface listProduct {
  row: number;
  data: listProductData[];
}
interface listProductData {
  category_id: number;
  addition_cate: number[];
  product_id: number;
  sku: string;
  name_th: string;
  brand: string;
  price_sale: string;
  price_before: string;
  discount: string | null;
  image: string;
  image800: string;
}

export default listProduct;
