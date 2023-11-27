import { FC, Fragment } from "react";
// import FlexBox from "@component/FlexBox";
// import Pagination from "@component/pagination";
// import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import listProduct from "@models/listProduct.model";
// ==========================================================
type Props = { products: listProduct };
// ==========================================================

const ProductCard9List: FC<Props> = ({ products }) => {
  const formatSlug = (name) => {
    let formattedSlug = name.replace(/\s+/g, "-");

    formattedSlug = formattedSlug
      .replace(/\/+/g, "-")
      .replace(/(\(\d{2}\+\w+\))/g, "-$1")
      .replace(/(\(\d{2}\+\w+\))-/g, "$1");

    formattedSlug = formattedSlug.replace(/[^a-zA-Z0-9-().]+/g, "");

    formattedSlug = formattedSlug.replace(/-(?=-)/g, "");

    return formattedSlug.toLowerCase();
  };
  return (
    <Fragment>
      {products.data.map((item) => (
        <ProductCard9
          mb="1.25rem"
          id={item.product_id}
          key={item.product_id}
          slug={formatSlug(item.name_th)}
          price={parseFloat(item.price_sale)}
          priceBefore={parseFloat(item.price_before)}
          title={item.name_th}
          off={parseFloat(item.discount)}
          imgUrl={item.image800}
        />
      ))}
    </Fragment>
  );
};

export default ProductCard9List;
