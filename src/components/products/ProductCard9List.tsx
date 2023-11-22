import { FC, Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import listProduct from "@models/listProduct.model";
// ==========================================================
type Props = { products: listProduct[] };
// ==========================================================

const ProductCard9List: FC<Props> = ({ products }) => {
  return (
    <Fragment>
      {products.map((item) => (
        <ProductCard9
          mb="1.25rem"
          id={item.product_id}
          key={item.product_id}
          slug={item.name_th}
          price={parseInt(item.price_sale)}
          title={item.name_th}
          off={parseFloat(item.discount)}
          imgUrl={item.image800}
        />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing 1-9 of 1.3k Products</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </Fragment>
  );
};

export default ProductCard9List;
