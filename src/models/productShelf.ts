interface product {
  product_id: number;
  name: string;
  id: number;
  sku: string;
  market_price: string;
  sell_price: string;
  ecom_market_price: string;
  cat_name_th: string;
  brand_name_th: string;
  product_guide: string;
  total_stock: string;
  price_sale: string;
  price_before: string;
  img: string;
  discount: string;
}

interface productShelf {
  display_id: number;
  display_name_th: string;
  display_name_gb: string;
  display_item: string;
  sort_by: string;
  status: string;
  create_dtm: string;
  create_by: number;
  update_dtm: string;
  update_by: number;
  product: product[];
}

export default productShelf;
