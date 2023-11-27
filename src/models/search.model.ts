interface search {
  count: number;
  minPrice: string;
  maxPrice: string;
  data: searchData[];
}
interface searchData {
  product_id: number;
  name_th: string;
  name_gb: string;
  id: number;
  sku: string;
  cat_name_gb: string;
  brand_name_gb: string;
  product_guide: string;
  total_stock: string;
  img800: string;
  price_sale: string;
  price_before: string;
  discount: number;
}

export default search;
