import { useCallback, useState, FC } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
// import Select from "@component/Select";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
// import ProductCard1List from "@component/products/ProductCard1List";
// import ProductCard9List from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import product from "@data/product";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import api from "@utils/__api__/products";
import listProduct from "@models/listProduct.model";
// import { ProductCard1 } from "@component/product-cards";
import detailCategory from "@models/detailCategory.model";
// import Container from "@component/Container";

type Props = {
  categoryId: string;
  categoryName: string;
  product: listProduct[];
  categoryLink: string;
  categoriesDetail: detailCategory;
};

const ProductCategory: FC<Props> & { layout: React.FC } = ({
  categoriesDetail,
}) => {
  // const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");

  // const isTablet = width < 1025;
  const toggleView = useCallback((v) => () => setView(v), []);
  // console.log(product);
  const router = useRouter();
  const { query } = router;
  // const categoryId = query.id?.toString() || "";
  const productName = query.slug?.toString() || "";

  return (
    <Box pt="20px">
      <FlexBox mb="1rem">
        <div>
          <img
            src={categoriesDetail.banner}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </FlexBox>
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H5>"{productName}"</H5>

          <Paragraph color="text.muted">จำนวน 5 รายการ</Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Short by:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            {/* <Select
              placeholder="Short by"
              // defaultValue={sortOptions[0]}
              // options={sortOptions}
            /> */}
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            View:
          </Paragraph>

          <IconButton size="small" onClick={toggleView("grid")} ml="0.5rem">
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}
            >
              grid
            </Icon>
          </IconButton>

          <IconButton size="small" onClick={toggleView("list")} ml="0.5rem">
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}
            >
              menu
            </Icon>
          </IconButton>
        </FlexBox>
      </FlexBox>
      <Grid container spacing={6}>
        {/* FILTER */}
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard
          // selectedBrands={selectedBrands}
          // onBrandCheckboxChange={handleBrandCheckboxChange}
          // selectedSocketType={selectedSocketType}
          // onSocketTypeCheckboxChange={handleSocketTypeCheckboxChange}
          // minPrice={minPrice}
          // onMinPriceChange={handleMinPriceChange}
          // maxPrice={maxPrice}
          // onMaxPriceChange={handleMaxPriceChange}
          // clearFilters={clearFilters}
          // handleItemRemove={handleItemRemove}
          // clearBrands={clearBrands}
          // clearSocket={clearSocket}
          />
        </Hidden>
        {/* PRODUCTS */}
        <Grid item lg={9} xs={12}>
          {/* {view === "grid" ? (
            <ProductCard1List
              products={product}
              // selectedBrands={selectedBrands}
              // selectedSocketType={selectedSocketType}
              // minPrice={minPrice}
              // maxPrice={maxPrice}
            />
          ) : (
            <ProductCard9List products={product} />
          )} */}
          {/* {product &&
            product.map((item, ind) => (
              <ProductCard1
                hoverEffect
                id={item.product_id}
                slug={item.name_th}
                title={item.name_th}
                price={parseInt(item.price_sale)}
                priceBefore={parseInt(item.price_before)}
                off={parseInt(item.discount)}
                imgUrl={item.image800}
              />
            ))} */}
        </Grid>
      </Grid>
    </Box>
  );
};
ProductCategory.layout = NavbarLayout;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const categoriesResponse = await api.getCategoryNameById();
    const categories = categoriesResponse;

    const category = categories.find((c) => c.link === `/category/${slug}`);
    const categoryID = category?.categoryID.toString();

    const categoriesDetail = await api.getDetailCategory(categoryID);
    const productResponse = await api.getProductOfCategory(categoryID);
    // const filterProductCategory = await api.getFilterProductCategory(
    //   categoryID
    // );

    return {
      props: {
        categoryId: category?.categoryID || "",
        categoryName: category?.title_gb || "",
        categoriesDetail,
        product: productResponse,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.message);
    return {
      props: {
        categoryId: "",
        categoryName: "",
        categoriesDetail: "",
        product: null,
      },
    };
  }
};

export default ProductCategory;
