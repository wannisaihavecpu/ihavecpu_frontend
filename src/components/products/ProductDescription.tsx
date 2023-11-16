import { FC } from "react";
import Box from "@component/Box";
import Table from "@component/table";
import { FadeInUp } from "./styles";
import productView from "@models/productView.model";

type ProductDescriptionProps = {
  product: productView;
};
const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <FadeInUp>
      <Box>
        <Table product={product} />
      </Box>
    </FadeInUp>
  );
};

export default ProductDescription;
