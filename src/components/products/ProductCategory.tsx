import { FC, Fragment, useEffect, useCallback } from "react";
import Card from "@component/Card";
import SettingSearch from "./SettingSearch";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
// import ButtonText from "@component/buttons/ButtonText";
import TextField from "@component/text-field";
import { H6, H5, SemiSpan, Paragraph } from "@component/Typography";
import { IconButton } from "@component/buttons";

import { useState } from "react";
import Box from "@component/Box";
// import axios from "axios";
import getGroupSearch from "@models/getGroupSearch";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
// import { Fragment } from "react";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import listProduct from "@models/listProduct.model";
import { ProductCard1Skeleton } from "@component/product-cards";
import Pagination from "@component/pagination";
import Slider from "rc-slider";
import StyledRcSlide from "./rcSlideStyle";
import styles from "./scroll.module.css";
import { useRouter } from "next/router";
import Select from "@component/Select";

type ProductCategoryProps = {
  products?: listProduct;
  categoryID?: string;
  groupSearch?: getGroupSearch[];
  onCheckboxChange?: (filterId: string, isSelected: boolean) => void;
  clearFilters?: () => void;
  currentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const ProductsCategory: FC<ProductCategoryProps> = ({
  currentPage,
  // clearFilters,
  categoryID,
  products,
  groupSearch,
  setCurrentPage,
}) => {
  const [low, setLow] = useState("0");
  const [high, setHigh] = useState("100000");
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string }[]
  >([]);
  const [filters, setFilter] = useState(groupSearch);
  const [productFilter, setProductFilter] = useState(products);
  // const [offset, setOffset] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");

  const router = useRouter();
  const { query } = router;
  const productName = query.slug?.toString() || "";

  const toggleView = useCallback((v) => () => setView(v), []);

  const getSelectedItemsNames = () => {
    return selectedItems;
  };

  const handleCheckboxChange = (filterId: number, itemName: string) => {
    setSelectedItems((prevItems) => {
      const selectedItem = prevItems.find((item) => item.id === filterId);

      if (selectedItem) {
        return prevItems.filter((item) => item.id !== filterId);
      } else {
        return [...prevItems, { id: filterId, name: itemName }];
      }
    });
  };

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const filterIds = selectedItems.map((item) => item.id);
      // const page = currentPage;
      const limit = 12;
      const newOffset = 0;
      // setOffset(newOffset);

      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${categoryID}&offset=${newOffset}&limit=${limit}&sort=desc&field=cost_price`;

      if (filterIds.length > 0) {
        apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
      }

      apiUrl += `&min=${low}&max=${high}`;

      // console.log(apiUrl);

      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl);
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

  const fetchProductDataForRangeSlider = async (
    priceLow: string,
    priceHigh: string
  ) => {
    setLoading(true);
    try {
      const filterIds = selectedItems.map((item) => item.id);
      // const page = currentPage;
      const limit = 12;
      const newOffset = 0;
      // setOffset(newOffset);
      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${categoryID}&offset=${newOffset}&limit=${limit}&sort=desc&field=cost_price`;

      if (filterIds.length > 0) {
        apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
      }

      apiUrl += `&min=${priceLow}&max=${priceHigh}`;

      // console.log(apiUrl);

      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl);
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

  const handleItemRemove = (itemId: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handlePageChange = async (newPage: number) => {
    try {
      const filterIds = selectedItems.map((item) => item.id);
      const limit = 12;
      const newOffset = (newPage - 1) * 12;
      // setOffset(newOffset);

      let findNumberPage = newOffset / limit;

      // console.log("findNumberPage", findNumberPage);

      if (findNumberPage === 0) {
        findNumberPage = 1;
      }

      if (filterIds.length > 0) {
        setCurrentPage(1);
      }

      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${categoryID}&offset=${newOffset}&limit=${limit}&sort=desc&field=cost_price`;

      if (filterIds.length > 0) {
        apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
      }

      if (low !== "0" || high !== "100000") {
        apiUrl += `&min=${low}&max=${high}`;
      }

      const productResponse = await fetch(apiUrl);
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
      const filterIds = selectedItems.map((item) => item.id);
      const limit = 12;
      const newOffset = (currentPage - 1) * 12;

      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${categoryID}&offset=${newOffset}&limit=${limit}&field=cost_price`;

      if (filterIds.length > 0) {
        apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
      }

      apiUrl += `&min=${low}&max=${high}`;

      apiUrl += `&sort=${value.value}`;

      const productResponse = await fetch(apiUrl);
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        setLoading(false);
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
    const fetchFilterData = async () => {
      try {
        const filterIds = selectedItems.map((item) => item.id);

        const filterResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/category/getGroupSearch/${categoryID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:
              filterIds.length > 0
                ? JSON.stringify({ filter: filterIds })
                : undefined,
          }
        );

        const filterData = await filterResponse.json();

        if (filterData.res_code === "00") {
          setFilter(filterData.res_result);
        } else {
          console.error("failed to fetch filters");
        }
      } catch (error) {
        console.error("Error fetching filters", error);
      }
    };

    fetchFilterData();
    fetchProductData();
  }, [selectedItems, categoryID]);

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
          <H5>{productName}</H5>

          <Paragraph color="text.muted">
            จำนวน {products?.row ?? "0"} รายการ
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            เรียงตาม:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Sort by"
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
            {getSelectedItemsNames().length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <H5>การค้นหา</H5>
                  {/* <ButtonText>ล้างทั้งหมด</ButtonText> */}
                </div>
                <Box m="6px">
                  <SettingSearch
                    items={getSelectedItemsNames()}
                    handleItemRemove={handleItemRemove}
                  />
                </Box>
                <Divider mt="18px" mb="24px" />
              </>
            ) : null}
            <H6 mb="16px">ช่วงราคา</H6>
            <FlexBox justifyContent="space-between" alignItems="center">
              <TextField
                //   placeholder="0"
                type="number"
                fullwidth
                value={low}
                onChange={(e) => {
                  const value = e.target.value;
                  setLow(value);
                  // fetchProductData();
                }}
              />
              <H5 color="text.muted" px="0.5rem">
                -
              </H5>
              <TextField
                //   placeholder="250"
                type="number"
                fullwidth
                value={high}
                onChange={(e) => {
                  const value = e.target.value;
                  setHigh(value);
                  // fetchProductData();
                }}
              />
            </FlexBox>

            <Box mt="1rem">
              <StyledRcSlide>
                <Slider
                  range
                  min={0}
                  max={100000}
                  step={1000}
                  value={[parseInt(low), parseInt(high)]}
                  onChange={(values) => {
                    const [newLow, newHigh] = Array.isArray(values)
                      ? values.map(String)
                      : [String(values)];

                    setLow(newLow);
                    setHigh(newHigh);
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

            <Divider my="24px" />
            {filters?.map((filter) => (
              <div
                key={filter.filter_id}
                style={{
                  marginBottom: "10px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
                className={styles.scroll}
              >
                <H6>{filter.name_th}</H6>
                {filter.sub_filter.length > 0 ? (
                  <div>
                    {filter.sub_filter.map((item) => (
                      <CheckBox
                        my="10px"
                        key={item.filter_id}
                        name={item.name_th}
                        value={item.filter_id.toString()}
                        color="ihavecpu"
                        label={
                          <SemiSpan color="inherit">
                            {item.name_th.length > 21
                              ? item.name_th.slice(0, 21) + "..."
                              : item.name_th}
                          </SemiSpan>
                        }
                        onChange={() =>
                          handleCheckboxChange(item.filter_id, item.name_th)
                        }
                        checked={selectedItems.some(
                          (selected) => selected.id === item.filter_id
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No sub-filters available</p>
                )}
                <Divider my="24px" />
              </div>
            ))}
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
            ) : view === "grid" ? (
              <ProductCard1List products={productFilter} />
            ) : (
              <ProductCard9List products={productFilter} />
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
                  products.row
                )} - ${Math.min(currentPage * 12, products.row)} of ${
                  products.row
                } Products`}</SemiSpan>
              )}

              {productFilter && (
                <Pagination
                  pageCount={Math.max(1, Math.ceil(productFilter.row / 12))}
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
export default ProductsCategory;
