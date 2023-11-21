interface flashsale {
  campaign_id: number;
  campaign_name_th: string;
  campaign_name_gb: string;
  campaign_start_date: string;
  campaign_start_time: string;
  campaign_end_date: string;
  campaign_end_time: string;
  campaign_end_datetime: string;
  product: [
    {
      product_id: number;
      product_code: number;
      cat_id: number;
      brand_id: number;
      barcode: string;
      name_th: string;
      name_gb: string;
      price_sale: string;
      price_before: string;
      discount: string;
      stock: number;
      picture_name: string;
    }
  ];
}
export default flashsale;
