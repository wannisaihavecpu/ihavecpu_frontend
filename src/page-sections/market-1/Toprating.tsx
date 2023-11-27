import { FC } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import CategorySectionHeader from "@component/CategorySectionHeader";
import { ProductCard4, ProductCard5 } from "@component/product-cards";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import productShelf from "@models/productShelf";

// ===================================================================
type Props = {
  topRatedBrands: Brand[];
  topRatedList: Product[];
  bestSeller: productShelf[];
};
// ===================================================================

const Toprating: FC<Props> = ({ topRatedBrands, bestSeller }) => {
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
    <Box mb="3.75rem">
      <Container>
        <Grid container spacing={6}>
          <Grid item lg={6} xs={12}>
            <CategorySectionHeader
              iconName="ranking-1"
              title="สินค้าขายดี"
              seeMoreLink="#"
            />

            <Card p="1rem">
              <Grid container spacing={4}>
                {bestSeller.map((shelf) =>
                  shelf.product.map((item) => (
                    <Grid item md={3} sm={6} xs={6} key={item.product_id}>
                      <Link
                        href={`/product/${item.product_id}/${formatSlug(
                          item.name
                        )}`}
                        passHref
                      >
                        <a>
                          <ProductCard4
                            key={item.product_id}
                            title={item.name}
                            price={parseInt(item.price_sale)}
                            priceBefore={parseInt(item.price_before)}
                            imgUrl={item.img}
                            off={item.discount}
                          />
                        </a>
                      </Link>
                    </Grid>
                  ))
                )}
              </Grid>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <CategorySectionHeader
              iconName="Group"
              title="อุปกรณ์เสริมมาใหม่"
              seeMoreLink="#"
            />

            <Card p="1rem">
              <Grid container spacing={4}>
                {topRatedBrands.map((item) => (
                  <Grid item sm={6} xs={12} key={item.id}>
                    <Link href={`/product/search/${item.slug}`} passHref>
                      <a>
                        <ProductCard5 title={item.name} imgUrl={item.image} />
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Toprating;
