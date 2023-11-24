import { FC, useEffect } from "react";
import Card from "@component/Card";
import SettingSearch from "./SettingSearch";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import ButtonText from "@component/buttons/ButtonText";
import TextField from "@component/text-field";
import { H6, H5, SemiSpan } from "@component/Typography";
import { useState } from "react";
import Box from "@component/Box";
// import axios from "axios";
import getGroupSearch from "@models/getGroupSearch";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
// import { Fragment } from "react";
// import ProductCard1List from "@component/products/ProductCard1List";
// import ProductCard9List from "@component/products/ProductCard9List";
import listProduct from "@models/listProduct.model";
import { ProductCard1, ProductCard1Skeleton } from "@component/product-cards";
import Pagination from "@component/pagination";
import Slider from "rc-slider";
import StyledRcSlide from "./rcSlideStyle";
import styles from "./scroll.module.css";

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
  clearFilters,
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

  const [loading, setLoading] = useState(true);

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

      console.log(apiUrl);

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

      console.log(apiUrl);

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

      console.log("findNumberPage", findNumberPage);

      if (findNumberPage === 0) {
        findNumberPage = 1;
      }

      // Reset the current page to 1 when a filter is applied
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

  return (
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
                <ButtonText onClick={clearFilters}>ล้างทั้งหมด</ButtonText>
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
          <Grid container spacing={6}>
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <Grid item lg={3} sm={6} xs={12} key={index}>
                    <ProductCard1Skeleton />
                  </Grid>
                ))
              : productFilter &&
                productFilter.data.map((item) => (
                  <Grid item lg={3} sm={6} xs={12} key={item.product_id}>
                    <ProductCard1
                      id={item.product_id}
                      slug={formatSlug(item.name_th)}
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
  );
};

export default ProductsCategory;
