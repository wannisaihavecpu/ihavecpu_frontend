import { FC } from "react";
import Grid from "@component/grid/Grid";
import { ProductCard1 } from "@component/product-cards";
// import { useRouter } from "next/router";

// ==========================================================
type Props = {
  products?;
  selectedBrands?: string[];
  selectedSocketType?: string[];
  minPrice?: string;
  maxPrice?: string;
};
// ==========================================================

const ProductCard1List: FC<Props> = ({
  products,
  // selectedBrands,
  // selectedSocketType,
  // minPrice,
  // maxPrice,
}) => {
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
    <div>
      <Grid container spacing={6}>
        {products?.data.map((item) => (
          <Grid item lg={3} sm={6} xs={12} key={item.product_id}>
            <ProductCard1
              key={item.product_id}
              id={item.product_id}
              slug={formatSlug(item.name_th)}
              price={parseFloat(item.price_sale)}
              off={parseFloat(item.discount)}
              priceBefore={parseFloat(item.price_before)}
              title={item.name_th}
              imgUrl={item.image800}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductCard1List;
