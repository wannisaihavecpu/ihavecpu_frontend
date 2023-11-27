import { FC } from "react";
import Grid from "@component/grid/Grid";
import { ProductCard1 } from "@component/product-cards";
import listProduct from "@models/listProduct.model";
// import { useRouter } from "next/router";

// ==========================================================
type Props = {
  products?: listProduct;
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
  // filter products based on selected
  // const filteredProducts = products.filter((item) => {
  //   const brandMatch =
  //     selectedBrands.length === 0 || selectedBrands.includes(item.brand_id);
  //   const unitMatch =
  //     selectedSocketType.length === 0 ||
  //     selectedSocketType.includes(item.product_code);
  //   const priceMatch =
  //     minPrice === null ||
  //     maxPrice === null ||
  //     (parseFloat(item.market_price) >= parseFloat(minPrice) &&
  //       parseFloat(item.market_price) <= parseFloat(maxPrice));

  //   return brandMatch && unitMatch && priceMatch;
  // });
  // const router = useRouter();
  // const { push } = useRouter();
  // const { query } = router;

  // const { page = "1" } = query;
  // const currentPage = parseInt(page as string, 10);
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

  // const handlePageChange = (selectedPage: number) => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: { ...query, page: selectedPage.toString() },
  //   });
  // };

  return (
    <div>
      <Grid container spacing={6}>
        {products.data.map((item) => (
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
