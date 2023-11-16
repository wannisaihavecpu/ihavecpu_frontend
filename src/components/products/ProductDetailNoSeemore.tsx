import { FC } from "react";
import Box from "@component/Box";
import Table from "@component/table";
import { FadeInUp } from "./styles";
import productView from "@models/productView.model";

type ProductDetailNoSeemoreProps = {
  product: productView;
};
const ProductDetailNoSeemore: FC<ProductDetailNoSeemoreProps> = ({
  product,
}) => {
  return (
    <FadeInUp>
      <Box
        dangerouslySetInnerHTML={{
          __html: product.description_th,
        }}
      ></Box>
    </FadeInUp>
  );
};

export default ProductDetailNoSeemore;
