import { useCallback, useState, FC } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import product from "@data/product";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import api from "@utils/__api__/products";
import listProduct from "@models/listProduct.model";
// import { ProductCard1 } from "@component/product-cards";
import detailCategory from "@models/detailCategory.model";
import getGroupSearch from "@models/getGroupSearch";
// import Container from "@component/Container";

type Props = {
  categoryId: string;
  categoryName: string;
  product: listProduct;
  categoryLink: string;
  categoriesDetail: detailCategory;
  filterProduct: getGroupSearch[];
};

const ProductCategory: FC<Props> & { layout: React.FC } = ({
  categoriesDetail,
  product,
  filterProduct,
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

  // price range
  // const [minPrice, setMinPrice] = useState<string | null>("0"); // 0 = mock up
  // const [maxPrice, setMaxPrice] = useState<string | null>("12000"); // "12000" = mock up

  // handle changes in Price Range filters
  // const handleMinPriceChange = (value: string) => {
  //   setMinPrice(value);
  // };
  // const handleMaxPriceChange = (value: string) => {
  //   setMaxPrice(value);
  // };

  // clear all Filters
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // const handleCheckboxChange = (filterId: string, isChecked: boolean) => {
  //   // setSelectedItems((prevSelectedItems) => {
  //   //   if (isChecked) {
  //   //     return [...prevSelectedItems, filterId];
  //   //   } else {
  //   //     return prevSelectedItems.filter((item) => item !== filterId);
  //   //   }
  //   // });
  // };

  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const handleSortChange = (value: string) => {
    setSelectedSortOption(value);
    fetchProducts(value);
  };

  const fetchProducts = async (sortOption: string | { value: string }) => {
    const actualValue =
      typeof sortOption === "string" ? sortOption : sortOption.value;

    const currentQuery = { ...router.query };
    currentQuery.page = "1";
    currentQuery.sort = actualValue;

    const newUrl = {
      pathname: router.pathname,
      query: currentQuery,
    };

    router.push(newUrl);
  };

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
            <Select
              placeholder="Short by"
              value={selectedSortOption}
              onChange={handleSortChange}
              options={sortOptions}
            />
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
            groupSearch={filterProduct}
            // onCheckboxChange={handleCheckboxChange}
            // // minPrice={minPrice}
            // onMinPriceChange={handleMinPriceChange}
            // maxPrice={maxPrice}
            // onMaxPriceChange={handleMaxPriceChange}
          />
        </Hidden>
        {/* PRODUCTS */}
        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductCard1List products={product} />
          ) : (
            <ProductCard9List products={product} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
const sortOptions = [
  { label: "ราคาต่ำ-สูง", label_en: "Price Low to High", value: "asc" },
  { label: "ราคาสูง-ต่ำ", label_en: "Price High to Low", value: "desc" },
];
ProductCategory.layout = NavbarLayout;
export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const slug = params?.slug as string;
  const page = parseInt(query.page as string) || 1;
  const sort = (query.sort as string) || "";

  try {
    const categoriesResponse = await api.getCategoryNameById();
    const categories = categoriesResponse;

    const category = categories.find((c) => c.link === `/category/${slug}`);
    const categoryID = category?.categoryID.toString();

    const categoriesDetail = await api.getDetailCategory(categoryID);

    const offset = (page - 1) * 12;
    const productResponse = await api.getProductOfCategory(
      categoryID,
      offset,
      12,
      sort
    );

    const filterProductCategory = await api.getFilterProductCategory(
      categoryID
    );

    return {
      props: {
        categoryId: category?.categoryID || "",
        categoryName: category?.title_gb || "",
        categoriesDetail,
        product: productResponse,
        filterProduct: filterProductCategory,
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
        filterProduct: null,
      },
    };
  }
};

export default ProductCategory;
