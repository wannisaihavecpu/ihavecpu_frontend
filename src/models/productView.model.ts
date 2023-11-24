interface productView {
  product_id?: number;
  product_code?: string;
  cat_id?: string;
  name_th?: string;
  name_gb?: string;
  size_guide_gb?: string;
  size_guide_th?: string;
  cost_price?: string;
  market_price?: string;
  sell_price?: string;
  meta_title_th?: string;
  meta_title_gb?: string;
  meta_description_th?: string;
  meta_description_gb?: string;
  meta_keyword_th?: string;
  meta_keyword_gb?: string;
  product_vat?: string;
  icon_promotion?: string;
  product_type_option?: string;
  brand_id?: string;
  brand_name_th?: string;
  brand_name_gb?: string;
  description_th?: string;
  description_gb?: string;
  how_to_gb?: string;
  how_to_th?: string;
  ecom_market_price?: string;
  ecom_special_price?: string;
  link_youtube?: string;
  price_sale?: string;
  price_before?: string;
  picture?: [
    {
      pic_150?: string;
      pic_800?: string;
    }
  ];
  stock?: [
    {
      option_id?: number;
      stock?: number;
      choose?: string[];
    }
  ];
  option?: [
    {
      m_option_id?: number;
      m_option_name_th?: string;
      m_option_name_gb?: string;
      sub?: [{ sub_id?: number; sub_text?: string; sub_path_img?: string }];
    }
  ];
  property?: [
    {
      name_th?: string;
      name_gb?: string;
      filter_sub_id?: string;
      detail: [
        {
          name_th?: string;
          name_gb?: string;
          filter_id?: number;
        }
      ];
    }
  ];
}

export default productView;
