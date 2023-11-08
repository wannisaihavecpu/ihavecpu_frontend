interface listCouponProduct {
  id: number;
  code: string;
  title: string;
  description: string;
  endDate: string;
  highlight: {
    highlight1: string;
    highlight2: string;
  };
}

export default listCouponProduct;
