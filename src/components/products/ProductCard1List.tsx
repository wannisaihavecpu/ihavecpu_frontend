import { FC } from "react";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import listProduct from "@models/listProduct.model";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const { query } = router;

  const { page = "1" } = query;
  const currentPage = parseInt(page as string, 10);

  const handlePageChange = (selectedPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, page: selectedPage.toString() },
    });
  };

  return (
    <div>
      <Grid container spacing={6}>
        {products.data.map((item) => (
          <Grid item lg={3} sm={6} xs={12} key={item.product_id}>
            <ProductCard1
              id={item.product_id}
              slug={item.name_th}
              price={parseFloat(item.price_sale)}
              title={item.name_th}
              imgUrl={item.image800}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>{`Showing ${Math.min(
          (currentPage - 1) * 12 + 1,
          products.row
        )} - ${Math.min(currentPage * 12, products.row)} of ${
          products.row
        } Products`}</SemiSpan>

        <Pagination
          pageCount={Math.ceil(products.row / 12)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
