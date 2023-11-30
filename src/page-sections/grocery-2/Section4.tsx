import { FC, Fragment, useEffect, useState, useCallback } from "react";
import Box from "@component/Box";
import { H3, H5, SemiSpan, Paragraph } from "@component/Typography";
import Select from "@component/Select";

import { Carousel } from "@component/carousel";
import { ProductCard10 } from "@component/product-cards";
import useVisibleSlide from "./hooks/useVisibleSlide";
import menuDropdown from "@models/menuDropdown.model";
import SidenavDiy from "./SidenavDiy";
import Hidden from "@component/hidden";
import StyledProductCategory from "../market-1/styled";
import Icon from "@component/icon/Icon";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import CategorySectionHeader from "@component/CategorySectionHeader";
import { IconButton } from "@component/buttons";

import Product from "@models/product.model";
import { ProductCard1, ProductCard1Skeleton } from "@component/product-cards";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import Pagination from "@component/pagination";
import axios from "axios";
import getGroupSearch from "@models/getGroupSearch";
import CheckBox from "@component/CheckBox";
import { Button } from "react-scroll";
import ModalCheckBox from "@component/modal/modalCheckbox";

// =======================================================
type Props = {
  title?: string;
  products?: Product[];
  navList: menuDropdown[];
  currentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
// =======================================================
interface SelectedValue {
  label: string;
  value: string;
}
const Section4: FC<Props> = ({
  products,
  navList,
  currentPage,
  setCurrentPage,
}) => {
  const { visibleSlides } = useVisibleSlide();

  const [selected, setSelected] = useState("");
  const [product, setProduct] = useState(null);
  const [productFilter, setProductFilter] = useState(null);

  const [filters, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const toggleView = useCallback((v) => () => setView(v), []);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [categoryID, setCategoryID] = useState(null);

  // Function to handle clicking on a filter
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedFilter(null);
  };

  const handleCategoryClick = (categoryId) => () => {
    const clickedCategory = navList.find(
      (value) => value.categoryID.toString() === categoryId
    );

    if (clickedCategory && selected !== categoryId) {
      console.log("handleCategoryClick");
      // clear selected items when switch category
      setSelectedItems([]);
      setSelected(categoryId);
      setTitle(clickedCategory.title_th);
      setCategoryID(categoryId);
    }
  };
  useEffect(() => {
    // fetch filter data only after setSelectedItems([]) is complete
    if (categoryID !== null) {
      fetchFilterData(categoryID);
    }
  }, [selectedItems, categoryID]);

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
  const fetchFilterData = async (category_id: number) => {
    try {
      const filterIds = selectedItems.map((item) => item.id);
      console.log("filterDtat", filterIds);

      const filterResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/category/getGroupSearch/${category_id}`,
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
        setFilter(null);
        // console.error("failed to fetch filters", filterData);
      }
    } catch (error) {
      console.error("Error fetching filters", error);
    }
  };
  const fetchProductData = async (category_id: number) => {
    setLoading(true);
    try {
      const filterIds = selectedItems.map((item) => item.id);
      const limit = 12;
      const newOffset = 0;

      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${category_id}&offset=${newOffset}&limit=${limit}&sort=desc&field=cost_price`;

      if (filterIds.length > 0) {
        apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
      }
      console.log(apiUrl);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl);
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result.data);
        // setProductFilter(productData.res_result);
        setLoading(false);
        // setCurrentPage(1);
      } else {
        // setProductFilter(null);
        setLoading(false);
        // console.error("failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };
  const handlePageChange = async (newPage: number) => {
    try {
      const filterIds = selectedItems.map((item) => item.id);
      const limit = 12;
      const newOffset = (newPage - 1) * 12;

      let findNumberPage = newOffset / limit;

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

      const productResponse = await fetch(apiUrl);
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        setCurrentPage(newPage);
        setLoading(false);
      } else {
        setProductFilter(null);
        setLoading(true);

        // console.error("failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
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
  useEffect(() => {
    // set default (first category in api)
    const defaultCategoryID = navList[0].categoryID;
    fetchFilterData(defaultCategoryID);
    setCategoryID(defaultCategoryID);
    fetchProductData(defaultCategoryID);
    setSelected(defaultCategoryID.toString());
    setTitle(navList[0].title_th);
  }, []);
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
          // console.error("failed to fetch filters", filterData);
        }
      } catch (error) {
        console.error("Error fetching filters", error);
      }
    };

    fetchFilterData();
    fetchProductData(categoryID);
  }, [selectedItems, categoryID]);

  return (
    <Fragment>
      <Grid container spacing={6}>
        <FlexBox>
          <Hidden down={768} mr="1.75rem">
            <Box shadow={2} borderRadius={10} padding="1.25rem" bg="white">
              {navList.map((value, i) => (
                <StyledProductCategory
                  key={i}
                  mb="0.75rem"
                  onClick={handleCategoryClick(value.categoryID.toString())}
                  shadow={selected === value.categoryID.toString() ? 8 : null}
                  bg={
                    selected === value.categoryID.toString()
                      ? "white"
                      : "gray.100"
                  }
                >
                  {value.icon && (
                    <Icon size="20px" defaultcolor="auto">
                      {value.icon}
                    </Icon>
                  )}
                  <span className="product-diy-title">{value.title_th}</span>
                </StyledProductCategory>
              ))}
            </Box>
          </Hidden>{" "}
          <Grid item lg={9} xs={12}>
            <FlexBox
              as={Card}
              mb="55px"
              p="1.25rem"
              elevation={5}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <H5>{title}</H5>
              </Box>

              <FlexBox
                mt="1rem"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {filters?.map((filter) => (
                  <div
                    key={filter.filter_id}
                    style={{
                      marginBottom: "10px",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    <H3 fontSize={14} onClick={() => handleFilterClick(filter)}>
                      {filter.name_th}
                    </H3>

                    {selectedFilter === filter && (
                      <ModalCheckBox onClose={handleCloseModal}>
                        <div>
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
                                    handleCheckboxChange(
                                      item.filter_id,
                                      item.name_th
                                    )
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
                        </div>
                      </ModalCheckBox>
                    )}
                  </div>
                ))}
              </FlexBox>

              <FlexBox alignItems="center" flexWrap="wrap" width="100%">
                <Paragraph color="text.muted" mr="1rem">
                  เรียงตาม:
                </Paragraph>

                <Box flex="1 1 0" mr="1.75rem" minWidth="150px"></Box>

                <Paragraph color="text.muted" mr="0.5rem">
                  View:
                </Paragraph>

                <IconButton
                  size="small"
                  onClick={toggleView("grid")}
                  ml="0.5rem"
                >
                  <Icon
                    variant="small"
                    defaultcolor="auto"
                    color={view === "grid" ? "primary" : "inherit"}
                  >
                    grid
                  </Icon>
                </IconButton>

                <IconButton
                  size="small"
                  onClick={toggleView("list")}
                  ml="0.5rem"
                >
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

            <Box>
              {loading ? (
                <Grid container spacing={6}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Grid item lg={3} sm={6} xs={12} key={index}>
                      <ProductCard1Skeleton />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={6}>
                  {productFilter &&
                    productFilter.map((item, ind) => (
                      <Grid item lg={3} sm={6} xs={12} key={ind}>
                        <ProductCard1
                          hoverEffect
                          id={item.product_id}
                          slug={formatSlug(item.name_th)}
                          title={item.name_th}
                          price={parseInt(item.price_sale)}
                          priceBefore={parseInt(item.price_before)}
                          off={item.discount}
                          imgUrl={item.image800}
                        />
                      </Grid>
                    ))}
                </Grid>
              )}
            </Box>
            <FlexBox
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              mt="32px"
            >
              {/* {product && (
                <SemiSpan>{`Showing ${Math.min(
                  (currentPage - 1) * 12 + 1,
                  product.count
                )} - ${Math.min(currentPage * 12, product.count)} of ${
                  product.count
                } Products`}</SemiSpan>
              )} */}
              {productFilter && (
                <Pagination
                  pageCount={Math.max(1, Math.ceil(productFilter.count / 12))}
                  currentPage={1}
                  // onPageChange={handlePageChange}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                />
              )}
            </FlexBox>
          </Grid>
        </FlexBox>
      </Grid>
    </Fragment>
  );
};

export default Section4;
