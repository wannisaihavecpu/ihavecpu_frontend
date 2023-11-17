import { FC } from "react";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import { ProductCard2 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import listProduct from "@models/listProduct.model";

// =======================================================
type Props = { product: listProduct[] };
// =======================================================

const Newproduct: FC<Props> = ({ product }) => {
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
    <CategorySectionCreator
      iconName="new-product-1"
      title="สินค้ามาใหม่"
      seeMoreLink="#"
    >
      <Card p="1rem">
        <Grid container spacing={6}>
          {product.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.product_id}>
              <ProductCard2
                id={item.product_id}
                discount={item.discount}
                slug={formatSlug(item.name_th)}
                title={item.name_th}
                priceSale={item.price_sale}
                priceBefore={item.price_before}
                imgUrl={item.image800}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
  );
};

export default Newproduct;
