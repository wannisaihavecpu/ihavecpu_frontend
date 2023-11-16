import { FC } from "react";
import Box from "@component/Box";
import { FadeInUp } from "./styles";
import TestResult from "./TestResult";
import ProductDetail from "./ProductDetail";
import ProductDescription from "./ProductDescription";
import CategorySectionHeader from "@component/CategorySectionHeader";
import productView from "@models/productView.model";

type OverviewProp = {
  product: productView;
};
const Overview: FC<OverviewProp> = ({ product }) => {
  return (
    <FadeInUp>
      <Box>
        {product.link_youtube && (
          <Box mb="2rem">
            <CategorySectionHeader
              iconName="test"
              title="ผลเทส"
              color="ihavecpu"
            />
            <TestResult />
          </Box>
        )}
        {product.description_th && (
          <Box mb="2rem">
            <CategorySectionHeader
              iconName="details"
              title="รายละเอียดสินค้า"
              color="ihavecpu"
            />
            <ProductDetail product={product} />
          </Box>
        )}
        {product.property && product.property.length > 0 && (
          <Box mb="2rem">
            <CategorySectionHeader
              iconName="details"
              title="คุณสมบัติสินค้า"
              color="ihavecpu"
            />
            <ProductDescription product={product} />
          </Box>
        )}
      </Box>
    </FadeInUp>
  );
};

export default Overview;
