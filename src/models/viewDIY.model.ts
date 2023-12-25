interface viewDIY {
  priceBeforeDiscount?: number;
  netPrice?: number;
  discount?: number;
  productDetail: listProductDetail[];
}

interface listProductDetail {
  product_id: number;
  cat_id: number;
  category_name: string;
  addition_cate: number[];
  name_th: string;
  filter_sub_id: string;
  filter_id: number;
  filterArray: string;
  size: string;
  size_sub: string;
  slot: string;
  sata: string;
  m2: string;
  m_slot: string;
  max_memory: string;
  quantity: number;
  stock: number;
  status: string;
  store_status: string;
  price_sale: string;
  price_before: string;
  discount: string;
  imgUrl: string;
  image800: string;
}
export default viewDIY;
