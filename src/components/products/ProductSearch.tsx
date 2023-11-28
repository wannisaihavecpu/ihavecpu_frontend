import { FC, Fragment, useEffect, useCallback } from "react";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
// import ButtonText from "@component/buttons/ButtonText";
import TextField from "@component/text-field";
import { H6, H5, SemiSpan, Paragraph } from "@component/Typography";
import { IconButton } from "@component/buttons";

import { useState } from "react";
import Box from "@component/Box";
// import axios from "axios";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
// import { Fragment } from "react";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import { ProductCard1Skeleton } from "@component/product-cards";
import Pagination from "@component/pagination";
import Slider from "rc-slider";
import StyledRcSlide from "./rcSlideStyle";
import { useRouter } from "next/router";
import Select from "@component/Select";
import search from "@models/search.model";

type ProductCategoryProps = {
  products?: search;
  currentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const ProductSearch: FC<ProductCategoryProps> = ({
  currentPage,
  products,
  setCurrentPage,
}) => {
  const [low, setLow] = useState(parseInt(products.minPrice, 10));
  const [high, setHigh] = useState(parseInt(products.maxPrice, 10));

  const [productFilter, setProductFilter] = useState(products);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const router = useRouter();
  const { query } = router;
  const searchProduct = query.slug?.toString() || "";
  const toggleView = useCallback((v) => () => setView(v), []);

  const fetchProductDataForRangeSlider = async (
    priceLow: string,
    priceHigh: string
  ) => {
    setLoading(true);
    try {
      const limit = 12;
      const newOffset = 0;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/search`;

      const requestBody = {
        min: priceLow,
        max: priceHigh,
        search: searchProduct,
        lang: "th",
        field: "sell_price",
        sort: selectedSortOption?.value ?? "asc",
        offset: newOffset,
        limit: limit,
      };

      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        setLoading(false);
        setCurrentPage(1);
      } else {
        setProductFilter(null);
        setLoading(false);
        console.error("failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };

  const handlePageChange = async (newPage: number) => {
    try {
      const limit = 12;
      const newOffset = (newPage - 1) * 12;

      const apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/search`;

      const requestBody = {
        min: low,
        max: high,
        search: searchProduct,
        lang: "th",
        field: "sell_price",
        sort: selectedSortOption?.value ?? "asc",
        offset: newOffset,
        limit: limit,
      };

      const productResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        setCurrentPage(newPage);
        setLoading(false);
      } else {
        setProductFilter(null);
        setLoading(true);

        console.error("failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };
  const handleSortChange = async (value: {
    label: string;
    label_en: string;
    value: string;
  }) => {
    setSelectedSortOption(value);
    setLoading(true);

    try {
      const limit = 12;
      const newOffset = (currentPage - 1) * 12;

      const apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/search`;

      const requestBody = {
        min: low,
        max: high,
        search: searchProduct,
        lang: "th",
        field: "sell_price",
        sort: value.value,
        offset: newOffset,
        limit: limit,
      };

      const productResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        setLoading(false);
        setCurrentPage(1);
      } else {
        setProductFilter(null);
        setLoading(false);
        console.error("failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    setProductFilter(products);
    setCurrentPage(1);
    setSelectedSortOption(null);
    setLow(parseInt(products.minPrice, 10));
    setHigh(parseInt(products.maxPrice, 10));
  }, [searchProduct]);

  return (
    <Fragment>
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
          <H5>การค้นหา "{searchProduct}"</H5>

          <Paragraph color="text.muted">
            จำนวน {productFilter?.count ?? "0"} รายการ
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            เรียงตาม:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="เรียงลำดับ"
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
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <Card p="18px 27px" elevation={5}>
            <H6 mb="16px">ช่วงราคา</H6>
            <FlexBox justifyContent="space-between" alignItems="center">
              <TextField
                //   placeholder="0"
                disabled
                type="number"
                fullwidth
                value={low}
                onChange={(e) => {
                  const value = e.target.value;
                  setLow(parseInt(value));

                  // fetchProductData();
                }}
              />
              <H5 color="text.muted" px="0.5rem">
                -
              </H5>
              <TextField
                //   placeholder="250"
                disabled
                type="number"
                fullwidth
                value={high}
                onChange={(e) => {
                  const value = e.target.value;
                  setHigh(parseInt(value));
                  // fetchProductData();
                }}
              />
            </FlexBox>

            <Box mt="1rem">
              <StyledRcSlide>
                <Slider
                  range
                  min={parseInt(products.minPrice)}
                  max={parseInt(products.maxPrice)}
                  step={1000}
                  value={[low, high]}
                  onChange={(values) => {
                    const [newLow, newHigh] = Array.isArray(values)
                      ? values.map(String)
                      : [String(values)];

                    setLow(parseInt(newLow));
                    setHigh(parseInt(newHigh));
                  }}
                  onAfterChange={(values) => {
                    const [newLow, newHigh] = Array.isArray(values)
                      ? values.map(String)
                      : [String(values)];

                    fetchProductDataForRangeSlider(newLow, newHigh);
                  }}
                />
              </StyledRcSlide>
            </Box>
          </Card>
        </Hidden>
        <Grid item lg={9} xs={12}>
          <div>
            {loading ? (
              <Grid container spacing={6}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <Grid item lg={3} sm={6} xs={12} key={index}>
                    <ProductCard1Skeleton />
                  </Grid>
                ))}
              </Grid>
            ) : productFilter.count > 0 ? (
              view === "grid" ? (
                <ProductCard1List products={productFilter} />
              ) : (
                <ProductCard9List products={productFilter} />
              )
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                ไม่มีสินค้า
              </div>
            )}

            <FlexBox
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              mt="32px"
            >
              {productFilter && (
                <SemiSpan>{`Showing ${Math.min(
                  (currentPage - 1) * 12 + 1,
                  productFilter.count
                )} - ${Math.min(currentPage * 12, productFilter.count)} of ${
                  productFilter.count
                } Products`}</SemiSpan>
              )}
              {productFilter && (
                <Pagination
                  pageCount={Math.max(1, Math.ceil(productFilter.count / 12))}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                />
              )}
            </FlexBox>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const sortOptions = [
  { label: "ราคาต่ำ-สูง", label_en: "Price Low to High", value: "asc" },
  { label: "ราคาสูง-ต่ำ", label_en: "Price High to Low", value: "desc" },
];
export default ProductSearch;
