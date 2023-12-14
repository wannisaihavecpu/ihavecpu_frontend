import { FC, Fragment, useEffect, useState, useCallback, useRef } from "react";
import Box from "@component/Box";
import { H3, H5, SemiSpan, Paragraph, Tiny } from "@component/Typography";
import Select from "@component/Select";
import TextField from "@component/text-field";
import StyledSearchBox from "@component/search-box/styled";
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
import NextImage from "next/image";
import { Chip } from "@component/Chip";
import Product from "@models/product.model";
import ModalNavBarDIY from "@component/modal/modalNavBarDIY";
import Link from "next/link";
import { ModalNavListDIY } from "@component/modal/styles";
import {
  ProductCard1DIY,
  ProductCard1Skeleton,
} from "@component/product-cards";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import Pagination from "@component/pagination";
import axios from "axios";
import getGroupSearch from "@models/getGroupSearch";
import CheckBox from "@component/CheckBox";
// import { Button } from "react-scroll";
import { Button } from "@component/buttons";

import ModalCheckBox from "@component/modal/modalCheckbox";
import ModalDIY from "@component/modal/modalDIY";
import { useRouter } from "next/router";
import { match } from "assert";
import useWindowSize from "@hook/useWindowSize";
import { notify } from "@component/toast";

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
const Section4: FC<Props> = ({ navList, currentPage, setCurrentPage }) => {
  // useState
  const width = useWindowSize();
  const { visibleSlides } = useVisibleSlide();
  const [selected, setSelected] = useState("");
  const [productFilter, setProductFilter] = useState(null);
  const [filters, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const toggleView = useCallback((v) => () => setView(v), []);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<
    {
      id: number;
      name: string;
      categoryID: number;
      additionCate: number[];
      filterID: number;
      filterSubID: number;
      price: string;
      priceBefore: string;
      discount: string;
      imgUrl: string;
      filterSubIDArray: number[];
      sizeRam: string;
      sizeSubRam: string;
      slotRam: string;
      sataMainBoard: string;
      m2MainBoard: string;
      mSlotMainBoard: string;
      maxMemoryMainBoard: string;
      quantity?: number;
    }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalNavListVisible, setIsModalNavListVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const router = useRouter();
  const categoryIDRef = useRef(categoryID);

  const handleCloseModalNavList = () => {
    setIsModalNavListVisible(false);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleCloseModal = () => {
    setSelectedFilter(null);
  };

  const handleCategoryClick = (categoryId) => () => {
    console.log("Category clicked:", categoryId);

    const clickedCategory = navList.find(
      (value) => value.categoryID.toString() === categoryId
    );
    console.log("clickedCtategor", clickedCategory);

    if (clickedCategory && selected !== categoryId) {
      console.log("sdsd");
      setSelectedItems([]);
      setSearchValue("");
      setSelectedSortOption(null);
      setSelected(categoryId);
      setTitle(clickedCategory.title_th);
      setCategoryID(categoryId);
    }
  };
  useEffect(() => {
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
        setProductFilter(null);
        // console.error("failed to fetch filters", filterData);
      }
    } catch (error) {
      console.error("Error fetching filters", error);
    }
  };
  const fetchProductData = async (
    category_id,
    searchKeyword = "",
    sortOption = ""
  ) => {
    setLoading(true);
    try {
      console.log(category_id);
      const filterIds = selectedItems.map((item) => item.id);
      const findParentID = navList.find(
        (value) => value.categoryID.toString() === category_id
      );
      console.log("selectedProduct", selectedProduct);

      const subFilter = selectedProduct
        .map((product) => product.filterSubIDArray)
        .flat()
        .filter((value) => value !== null && !isNaN(value));

      const limit = 12;
      const newOffset = 0;
      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?offset=${newOffset}&limit=${limit}&field=cost_price`;

      if (findParentID && findParentID.parent_id !== null) {
        apiUrl += `&addition=${findParentID.categoryID}&category_id=${findParentID.parent_id}`;
      } else {
        apiUrl += `&category_id=${category_id}`;
      }
      if (searchKeyword || searchValue) {
        apiUrl += `&search=${searchKeyword || searchValue}`;
      }
      if (sortOption) {
        apiUrl += `&sort=${sortOption}&field=cost_price`;
      } else {
        apiUrl += `&sort=desc&field=cost_price`;
      }

      // if (
      //   subFilter.length > 0 &&
      //   category_id != 48 &&
      //   category_id != 34 &&
      //   category_id != 49 &&
      //   category_id != 25 &&
      //   category_id != 267 &&
      //   category_id != 46 &&
      //   category_id != 50 &&
      //   category_id != 30
      // ) {
      //   const subFilterString = subFilter.join(",");
      //   apiUrl += `&sub_filter=[${subFilterString}]`;
      // }
      // if (filterIds.length > 0) {
      //   const combinedFilter = [...subFilter, ...filterIds];
      //   const filterString = combinedFilter.join(",");
      //   apiUrl += `&sub_filter=[${filterString}]`;
      // }
      const cateID = parseInt(category_id);

      if (
        (filterIds.length > 0 || subFilter.length > 0) &&
        cateID != 48 &&
        cateID != 97 &&
        cateID != 98 &&
        cateID != 99 &&
        cateID != 34 &&
        cateID != 49 &&
        cateID != 25 &&
        cateID != 267 &&
        cateID != 50 &&
        cateID != 28
      ) {
        console.log(cateID);
        // 29 = ram , 28 = mainboard
        if (filterIds.length > 0) {
          apiUrl += `&filter_main=[${filterIds.join(",")}]`;
        }
        // case if category 29 (ram)
        if (cateID === 29) {
          console.log("this 29");
          const hasCategory28 = selectedProduct.some(
            (product) => product.categoryID === 28
          );

          // case have category 28 (mainboard)
          if (hasCategory28) {
            const subFilterNotHaveCate29 = selectedProduct
              .filter((product) => product.categoryID !== 29)
              .map((product) => product.filterSubIDArray)
              .flat()
              .filter((value) => value !== null && !isNaN(value));
            const combinedFilter = [...subFilterNotHaveCate29];

            const filterString = combinedFilter.join(",");
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else {
          console.log("categoryID", category_id);
          const combinedFilter = [...subFilter];
          const filterString = combinedFilter.join(",");
          apiUrl += `&sub_filter=[${filterString}]`;
        }
      }
      // if (
      //   subFilter.length > 0 &&
      //   category_id != 48 &&
      //   category_id != 34 &&
      //   category_id != 49 &&
      //   category_id != 25 &&
      //   category_id != 267 &&
      //   category_id != 46 &&
      //   category_id != 50 &&
      //   category_id != 30
      // ) {
      //   const combinedFilter = [...subFilter, ...filterIds];
      //   const filterString = combinedFilter.join(",");
      //   apiUrl += `&sub_filter=[${filterString}]`;
      // }

      // console.log(apiUrl);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl);
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        // setProductFilter(productData.res_result);
        setLoading(false);
        // setCurrentPage(1);
      } else {
        setProductFilter(null);
        setLoading(false);
        // console.error("failed to fetch products");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products", error);
    }
  };
  const handlePageChange = async (
    newPage: number,
    searchKeyword = "",
    sortOption = ""
  ) => {
    setLoading(true);

    try {
      const filterIds = selectedItems.map((item) => item.id);
      const findParentID = navList.find(
        (value) => value.categoryID.toString() === categoryID
      );
      const subFilter = selectedProduct
        .map((product) => product.filterSubIDArray)
        .flat()
        .filter((value) => value !== null && !isNaN(value));
      const limit = 12;
      const newOffset = (newPage - 1) * 12;

      let findNumberPage = newOffset / limit;

      if (findNumberPage === 0) {
        findNumberPage = 1;
      }

      if (filterIds.length > 0) {
        setCurrentPage(1);
      }
      let apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?offset=${newOffset}&limit=${limit}`;

      if (findParentID && findParentID.parent_id !== null) {
        apiUrl += `&addition=${findParentID.categoryID}&category_id=${findParentID.parent_id}`;
      } else {
        apiUrl += `&category_id=${categoryID}`;
      }
      if (searchKeyword || searchValue) {
        apiUrl += `&search=${searchKeyword || searchValue}`;
      }
      if (sortOption) {
        apiUrl += `&sort=${sortOption}&field=cost_price`;
      } else {
        apiUrl += `&sort=desc&field=cost_price`;
      }

      // if (
      //   subFilter.length > 0 &&
      //   categoryID != 48 &&
      //   categoryID != 34 &&
      //   categoryID != 49 &&
      //   categoryID != 25 &&
      //   categoryID != 267 &&
      //   categoryID != 46 &&
      //   categoryID != 50 &&
      //   categoryID != 30
      // ) {
      //   const subFilterString = subFilter.join(",");
      //   apiUrl += `&sub_filter=[${subFilterString}]`;
      // }
      // if (filterIds.length > 0) {
      //   apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
      // }
      // if (
      //   subFilter.length > 0 &&
      //   categoryID != 48 &&
      //   categoryID != 34 &&
      //   categoryID != 49 &&
      //   categoryID != 25 &&
      //   categoryID != 267 &&
      //   categoryID != 46 &&
      //   categoryID != 50 &&
      //   categoryID != 30
      // ) {
      //   const combinedFilter = [...subFilter, ...filterIds];
      //   const filterString = combinedFilter.join(",");
      //   apiUrl += `&sub_filter=[${filterString}]`;
      // }
      const cateID = parseInt(categoryID);

      // if (
      //   (filterIds.length > 0 || subFilter.length > 0) &&
      //   categoryID != 48 &&
      //   categoryID != 34 &&
      //   categoryID != 49 &&
      //   categoryID != 25 &&
      //   categoryID != 267 &&
      //   categoryID != 46 &&
      //   categoryID != 50 &&
      //   categoryID != 30
      // ) {
      //   const combinedFilter = [...subFilter, ...filterIds];
      //   const filterString = combinedFilter.join(",");
      //   apiUrl += `&sub_filter=[${filterString}]`;
      // }
      if (
        (filterIds.length > 0 || subFilter.length > 0) &&
        cateID != 48 &&
        cateID != 97 &&
        cateID != 98 &&
        cateID != 99 &&
        cateID != 34 &&
        cateID != 49 &&
        cateID != 25 &&
        cateID != 267 &&
        cateID != 50 &&
        cateID != 28
      ) {
        console.log(cateID);
        // 29 = ram , 28 = mainboard
        if (cateID === 29) {
          console.log("this 29");
          const hasCategory28 = selectedProduct.some(
            (product) => product.categoryID === 28
          );

          if (hasCategory28) {
            const combinedFilter = [...subFilter, ...filterIds];
            const filterString = combinedFilter.join(",");
            apiUrl += `&sub_filter=[${filterString}]`;
          } else {
            if (filterIds.length > 0) {
              apiUrl += `&sub_filter=[${filterIds.join(",")}]`;
            }
          }
        } else {
          console.log("categoryID", categoryID);
          const combinedFilter = [...subFilter, ...filterIds];
          const filterString = combinedFilter.join(",");
          apiUrl += `&sub_filter=[${filterString}]`;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl);
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setLoading(false);

        setProductFilter(productData.res_result);
        setCurrentPage(newPage);
      } else {
        setLoading(false);

        setProductFilter(null);

        // console.error("failed to fetch products");
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
    // Call fetchProductData with the new sort option
    fetchProductData(categoryID, searchValue, value.value);
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

  // const handleAddToSelectedProducts = (
  //   productId,
  //   name,
  //   categoryID,
  //   additionCate,
  //   filterID,
  //   filterSubID,
  //   price,
  //   priceBefore,
  //   discount,
  //   imgUrl,
  //   filterSubIDArray
  // ) => {
  //   const categoryLimit = categoryID === 29 ? 2 : 1;

  //   const existingProductsForCategory = selectedProduct.filter(
  //     (product) => product.categoryID === categoryID
  //   );

  //   if (existingProductsForCategory.length >= categoryLimit) {
  //     return;
  //   }

  //   const existingProductIndex = existingProductsForCategory.findIndex(
  //     (product) => product.id === productId
  //   );

  //   if (existingProductIndex !== -1) {
  //     return;
  //   }

  //   setSelectedProduct((prevProducts) => [
  //     ...prevProducts,
  //     {
  //       id: productId,
  //       name,
  //       categoryID,
  //       additionCate,
  //       filterID,
  //       filterSubID,
  //       price,
  //       priceBefore,
  //       discount,
  //       imgUrl,
  //       filterSubIDArray,
  //     },
  //   ]);
  // };

  const handleAddToSelectedProducts = (
    productId,
    name,
    categoryID,
    additionCate,
    filterID,
    filterSubID,
    price,
    priceBefore,
    discount,
    imgUrl,
    sizeRam,
    sizeSubRam,
    slotRam,
    sataMainBoard,
    m2MainBoard,
    mSlotMainBoard,
    maxMemoryMainBoard,
    filterSubIDArray,
    action?
  ) => {
    const existingProduct = selectedProduct.find(
      (product) => product.id === productId
    );
    const existingProductIndex = selectedProduct.findIndex(
      (product) => product.categoryID === categoryID
    );
    const parentCategories = navList.filter((item) => item.parent_id !== null);
    const isParentCategory = parentCategories.some(
      (parentCategory) => parentCategory.parent_id === categoryID
    );
    const calculateTotalSlotRam = selectedProduct
      .filter((product) => product.categoryID === 29)
      .reduce(
        (total, product) =>
          total + parseInt(product.slotRam) * product.quantity,
        0
      );
    const hasCategory28 = selectedProduct.some(
      (product) => product.categoryID === 28
    );
    const hasCategory29 = selectedProduct.some(
      (product) => product.categoryID === 29
    );

    const calculateTotalMemoryRam = selectedProduct
      .filter((product) => product.categoryID === 29)
      .reduce(
        (total, product) =>
          total + parseInt(product.sizeRam) * product.quantity,
        0
      );
    console.log("calculateTotalMemoryRam", calculateTotalMemoryRam);

    const maxMSlotMainBoard = Math.max(
      ...selectedProduct
        .filter((product) => product.categoryID === 28)
        .map((product) => parseInt(product.mSlotMainBoard) || 0)
    );
    const maxMemoryMainBoardCate28 = Math.max(
      ...selectedProduct
        .filter((product) => product.categoryID === 28)
        .map((product) => parseInt(product.maxMemoryMainBoard) || 0)
    );

    if (existingProduct) {
      if (action === "add") {
        if (categoryID === 29) {
          console.log("calculateTotalSlotRam", calculateTotalSlotRam);

          console.log("slotRam", existingProduct.slotRam);

          const calculate =
            calculateTotalSlotRam + parseInt(existingProduct.slotRam);
          console.log("calculate", calculate);

          if (calculate <= maxMSlotMainBoard && maxMemoryMainBoardCate28) {
            console.log("calculateTotalSlotRam", calculateTotalSlotRam);
            const updatedProducts = selectedProduct.map((product) =>
              product.id === productId
                ? { ...product, quantity: product.quantity + 1 }
                : product
            );
            setSelectedProduct(updatedProducts);
          } else {
            notify("error", "ไม่สามารถเพิ่มได้");
          }
        }
      } else if (action === "remove") {
        if (existingProduct.quantity > 1) {
          // Decrement quantity if greater than 1
          const updatedProducts = selectedProduct.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          );

          setSelectedProduct(updatedProducts);
          notify("success", "ลดจำนวนแล้ว");
        } else {
          // Remove product if quantity is 1
          setSelectedProduct((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          notify("error", "ลบสินค้าออกจากสเปคแล้ว");
        }
      }
    } else {
      const calculateSlotRam = calculateTotalSlotRam + parseInt(slotRam);
      const calculateMemoryRam = calculateTotalMemoryRam + parseInt(sizeRam);

      if (!isParentCategory) {
        // case normally category_id not have parent_id

        const existingProductIndex = selectedProduct.findIndex(
          (product) => product.categoryID === categoryID
        );
        // console.log(existingProductIndex);

        if (categoryID === 28) {
          if (hasCategory29) {
            const maxMemoryMainBoardCategory28 = maxMemoryMainBoard;

            const productsCategory29 = selectedProduct.filter(
              (product) => product.categoryID === 29
            );

            const totalMemoryCategory29 = calculateTotalMemoryRam;

            // Additional condition to check mSlotMainBoard with slotRam
            const isSlotMainBoardValid = productsCategory29.every(
              (product) => product.mSlotMainBoard >= product.slotRam
            );

            // If the total memory of category 29 products exceeds maxMemoryMainBoard
            // or the mSlotMainBoard is not valid, perform the necessary adjustments
            if (
              totalMemoryCategory29 >= maxMemoryMainBoardCategory28 ||
              !isSlotMainBoardValid
            ) {
              let totalSizeRam = 0;
              let productsToRemove = [];

              // Iterate through category 29 products to find the products to remove
              for (const product of productsCategory29) {
                totalSizeRam += parseInt(product.sizeRam) * product.quantity;

                // If total sizeRam exceeds maxMemoryMainBoard, mark the product for removal
                if (totalSizeRam > maxMemoryMainBoardCategory28) {
                  productsToRemove.push(product);
                }
              }
              console.log("totalMemoryCategory29", totalMemoryCategory29);
              console.log("isSlotMainBoardValid", totalMemoryCategory29);

              console.log(
                "maxMemoryMainBoardCategory28",
                maxMemoryMainBoardCategory28
              );

              console.log("productsToRemove", productsToRemove);

              // Calculate the total quantity to be removed
              const totalQuantityToRemove = productsToRemove.reduce(
                (total, product) => total + product.quantity,
                0
              );

              // Iterate through productsToRemove and remove them from selectedProduct
              let updatedProducts = [...selectedProduct];
              for (const productToRemove of productsToRemove) {
                const index = updatedProducts.findIndex(
                  (product) => product.id === productToRemove.id
                );

                if (index !== -1) {
                  updatedProducts.splice(index, 1);
                }
              }

              // Update the selected products by replacing category 29 products with adjusted quantities
              setSelectedProduct((prevProducts) => [
                ...prevProducts.filter((product) => product.categoryID !== 29),
                ...updatedProducts,
              ]);

              // Added product category 28
              setSelectedProduct((prevProducts) => [
                ...prevProducts,
                {
                  id: productId,
                  name,
                  categoryID,
                  additionCate,
                  filterID,
                  filterSubID,
                  price,
                  priceBefore,
                  discount,
                  imgUrl,
                  sizeRam,
                  sizeSubRam,
                  slotRam,
                  sataMainBoard,
                  m2MainBoard,
                  mSlotMainBoard,
                  maxMemoryMainBoard,
                  filterSubIDArray,
                  quantity: 1,
                },
              ]);

              notify(
                "warning",
                `ปรับปรุงจำนวนสินค้าในสเปคแล้ว: ลบ ${totalQuantityToRemove} รายการ`
              );
            } else {
              // If remaining memory is enough, and slotRam is valid, add the selected product in category 28
              setSelectedProduct((prevProducts) => [
                ...prevProducts,
                {
                  id: productId,
                  name,
                  categoryID,
                  additionCate,
                  filterID,
                  filterSubID,
                  price,
                  priceBefore,
                  discount,
                  imgUrl,
                  sizeRam,
                  sizeSubRam,
                  slotRam,
                  sataMainBoard,
                  m2MainBoard,
                  mSlotMainBoard,
                  maxMemoryMainBoard,
                  filterSubIDArray,
                  quantity: 1,
                },
              ]);

              notify("success", "เพิ่มหสินค้าในสเปคแล้ว");
            }
          } else {
            setSelectedProduct((prevProducts) => [
              ...prevProducts,
              {
                id: productId,
                name,
                categoryID,
                additionCate,
                filterID,
                filterSubID,
                price,
                priceBefore,
                discount,
                imgUrl,
                sizeRam,
                sizeSubRam,
                slotRam,
                sataMainBoard,
                m2MainBoard,
                mSlotMainBoard,
                maxMemoryMainBoard,
                filterSubIDArray,
                quantity: 1,
              },
            ]);
          }
        } else {
          const calculateSlotRam = calculateTotalSlotRam + parseInt(slotRam);
          const calculateMemoryRam =
            calculateTotalMemoryRam + parseInt(sizeRam);
          if (categoryID === 29) {
            if (calculateSlotRam <= maxMSlotMainBoard) {
              setSelectedProduct((prevProducts) => [
                ...prevProducts,
                {
                  id: productId,
                  name,
                  categoryID,
                  additionCate,
                  filterID,
                  filterSubID,
                  price,
                  priceBefore,
                  discount,
                  imgUrl,
                  sizeRam,
                  sizeSubRam,
                  slotRam,
                  sataMainBoard,
                  m2MainBoard,
                  mSlotMainBoard,
                  maxMemoryMainBoard,
                  filterSubIDArray,
                  quantity: 1,
                },
              ]);
              notify("success", "เพิ่มสินค้าในสเปคแล้ว");
            } else {
              setSelectedProduct((prevProducts) => [
                ...prevProducts,
                {
                  id: productId,
                  name,
                  categoryID,
                  additionCate,
                  filterID,
                  filterSubID,
                  price,
                  priceBefore,
                  discount,
                  imgUrl,
                  sizeRam,
                  sizeSubRam,
                  slotRam,
                  sataMainBoard,
                  m2MainBoard,
                  mSlotMainBoard,
                  maxMemoryMainBoard,
                  filterSubIDArray,
                  quantity: 1,
                },
              ]);
            }
          } else {
            if (existingProductIndex !== -1) {
              // กรณีมีสินค้าอยู่แล้ว
              setSelectedProduct((prevProducts) => {
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = {
                  id: productId,
                  name,
                  categoryID,
                  additionCate,
                  filterID,
                  filterSubID,
                  price,
                  priceBefore,
                  discount,
                  imgUrl,
                  sizeRam,
                  sizeSubRam,
                  slotRam,
                  sataMainBoard,
                  m2MainBoard,
                  mSlotMainBoard,
                  maxMemoryMainBoard,
                  filterSubIDArray,
                  quantity: 1,
                };
                return updatedProducts;
              });
              notify("success", "แทนสินค้าในสเปคแล้ว");
            } else {
              setSelectedProduct((prevProducts) => [
                ...prevProducts,
                {
                  id: productId,
                  name,
                  categoryID,
                  additionCate,
                  filterID,
                  filterSubID,
                  price,
                  priceBefore,
                  discount,
                  imgUrl,
                  sizeRam,
                  sizeSubRam,
                  slotRam,
                  sataMainBoard,
                  m2MainBoard,
                  mSlotMainBoard,
                  maxMemoryMainBoard,
                  filterSubIDArray,
                  quantity: 1,
                },
              ]);
              notify("success", "เพิ่มหสินค้าในสเปคแล้ว");
            }
          }
        }
      } else {
        // Case when category has parent_id and the product is not mapping with category_id but mapping with additionCate

        const existingProductsParentIDForCategory = selectedProduct.filter(
          (product) =>
            Array.isArray(product.additionCate) &&
            product.additionCate.length === additionCate.length &&
            product.additionCate.every(
              (value, index) => value === additionCate[index]
            ) &&
            product.categoryID === categoryID
        );

        const existingProductIndex = selectedProduct.findIndex(
          (product) =>
            Array.isArray(product.additionCate) &&
            product.additionCate.length === additionCate.length &&
            product.additionCate.every(
              (value, index) => value === additionCate[index]
            ) &&
            product.categoryID === categoryID
        );

        if (existingProductsParentIDForCategory.length === 0) {
          console.log("33");
          // If no product with the same additionCate and categoryID, add a new one
          setSelectedProduct((prevProducts) => [
            ...prevProducts,
            {
              id: productId,
              name,
              categoryID,
              additionCate,
              filterID,
              filterSubID,
              price,
              priceBefore,
              discount,
              imgUrl,
              sizeRam,
              sizeSubRam,
              slotRam,
              sataMainBoard,
              m2MainBoard,
              mSlotMainBoard,
              maxMemoryMainBoard,
              filterSubIDArray,
            },
          ]);
        } else {
          console.log("34");
          // If a product with the same additionCate and categoryID exists, do nothing
          setSelectedProduct((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[existingProductIndex] = {
              id: productId,
              name,
              categoryID,
              additionCate,
              filterID,
              filterSubID,
              price,
              priceBefore,
              discount,
              imgUrl,
              sizeRam,
              sizeSubRam,
              slotRam,
              sataMainBoard,
              m2MainBoard,
              mSlotMainBoard,
              maxMemoryMainBoard,
              filterSubIDArray,
            };
            return updatedProducts;
          });
        }
      }
    }
  };

  console.log(selectedProduct);

  const handleRemoveFromSelectedProducts = (productId) => {
    setSelectedProduct((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    notify("error", "ลบสินค้าออกจากสเปคแล้ว");
  };
  const hasProductsForCategory = (categoryID) => {
    return selectedProduct.some((item) => item.categoryID === categoryID);
  };
  const handleResetButtonClick = () => {
    setSelectedProduct([]);
    setSelectedItems([]);
    setFilter(null);
    setTitle("");
    notify("success", "รีเซ็ตสเปคทั้งหมดแล้ว");
  };
  const handleCreateSpecClick = () => {
    setIsModalVisible(true);
  };
  const handleToggleModal = () => {
    console.log("this handleToggle");
    setIsModalNavListVisible(true);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  useEffect(() => {
    let debounceTimeout;
    console.log("debounce");
    debounceTimeout = setTimeout(() => {
      fetchProductData(categoryID, searchValue);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchValue, categoryID]);

  // console.log(productFilter.row);

  useEffect(() => {
    // set default (first category in api)
    const defaultCategoryID = navList[0].categoryID;
    console.log("defaultCate", defaultCategoryID);
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
          setFilter(null);
        }
      } catch (error) {
        console.error("Error fetching filters", error);
      }
    };

    fetchFilterData();
    console.log("fetchgProdutGe", categoryID);
    fetchProductData(categoryID);
  }, [selectedItems, categoryID]);

  useEffect(() => {
    const { id } = router.query;

    if (id) {
      const fetchSpec = async () => {
        try {
          const viewSpecResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_PATH}/diy/view?id=${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const specData = await viewSpecResponse.json();

          if (specData.res_code === "00") {
            const mappedData = specData.res_result.map((item) => ({
              id: item.product_id,
              name: item.name_th,
              categoryID: item.cat_id,
              filterID: item.filter_id,
              filterSubID: item.filter_sub_id,
              price: item.price_sale,
              priceBefore: item.price_before,
              discount: item.discount,
              imgUrl: item.imgUrl,
            }));

            setSelectedProduct(mappedData);
          } else {
            console.error("Failed to fetch data", specData);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };

      fetchSpec();
    }
  }, [router.query.edit]);

  // console.log(selectedProduct);

  return (
    <Fragment>
      <Grid container spacing={6} className="diy">
        <Grid item xl={12} md={12} xs={12}>
          <Hidden up={900}>
            <FlexBox
              as={Card}
              mb="20px"
              p="1.25rem"
              elevation={5}
              flexWrap="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Icon size="14px" mr="0.5rem" onClick={handleToggleModal}>
                back
              </Icon>
              <H5 fontWeight={600}>ดูรายการจัดสเปคคอม</H5>
              <Chip
                p="0.20rem 1rem"
                ml="1rem"
                bg={`ihavecpu.light`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <H3 fontSize={13} color="#d4001a">
                  {selectedProduct?.length}
                </H3>
              </Chip>
            </FlexBox>
          </Hidden>
        </Grid>

        <FlexBox>
          <Hidden down={900} mr="1.75rem">
            <Box shadow={2} borderRadius={10} padding="1.25rem" bg="white">
              <Box shadow={2} borderRadius={10} padding="1.25rem" bg="white">
                {navList.map((value, i) => (
                  <Fragment key={i}>
                    {selectedProduct &&
                      selectedProduct
                        .filter((item) => {
                          if (value.parent_id !== null) {
                            const matchingProduct = selectedProduct.find(
                              (selectedItem) =>
                                selectedItem?.additionCate[0] ===
                                value.categoryID
                            );
                            return (
                              matchingProduct &&
                              matchingProduct.additionCate.some((cate) =>
                                item.additionCate.includes(cate)
                              )
                            );
                          } else {
                            return item.categoryID === value.categoryID;
                          }
                        })
                        .map((item, ind) => (
                          <StyledProductCategory
                            key={ind}
                            mb="0.75rem"
                            shadow={
                              selected === value.categoryID.toString()
                                ? 8
                                : null
                            }
                            bg={
                              selected === value.categoryID.toString()
                                ? "white"
                                : "gray.100"
                            }
                            onClick={handleCategoryClick(
                              value.categoryID.toString()
                            )}
                          >
                            <FlexBox
                              alignItems="left"
                              justifyContent="space-between"
                            >
                              <FlexBox alignItems="left" flexDirection="column">
                                <SemiSpan fontSize={12} mb="0.3rem">
                                  {value.title_th}
                                </SemiSpan>

                                <FlexBox alignItems="left" flexDirection="row">
                                  <NextImage
                                    src={item.imgUrl}
                                    height={40}
                                    width={40}
                                    objectFit="contain"
                                  />
                                  <FlexBox
                                    alignItems="left"
                                    flexDirection="column"
                                    ml="1rem"
                                  >
                                    <SemiSpan fontSize={12}>
                                      {item.name.length > 14
                                        ? item.name.slice(0, 15) + "..."
                                        : item.name}
                                    </SemiSpan>
                                    <FlexBox alignItems="center" mt="0.2rem">
                                      <a
                                        href={`/product/${item.id}/${formatSlug(
                                          item.name
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Chip
                                          p="0.25rem 1rem"
                                          bg={`ihavecpu.light`}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <H3
                                            fontSize={10}
                                            color="ihavecpu.main"
                                            style={{
                                              margin: "0",
                                              lineHeight: "1",
                                            }}
                                          >
                                            รายละเอียด
                                          </H3>
                                        </Chip>
                                      </a>
                                      {value.categoryID != 29 && (
                                        <SemiSpan fontSize={12} ml="0.5rem">
                                          x {item.quantity}
                                        </SemiSpan>
                                      )}
                                    </FlexBox>
                                    {value.categoryID == 29 && (
                                      <FlexBox alignItems="center" mt="0.2rem">
                                        <Chip
                                          p="0.10rem 0.5rem"
                                          bg={`white`}
                                          style={{
                                            border: "1px solid gray",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Button
                                            size="extrasmall"
                                            padding="3px"
                                            color="secondary"
                                            variant="outlinedNoBorder"
                                            style={{
                                              width: "19px",
                                              height: "19px",
                                            }}
                                            type="button"
                                            onClick={() =>
                                              handleAddToSelectedProducts(
                                                item.id,
                                                item.name,
                                                item.categoryID,
                                                item.additionCate,
                                                item.filterID,
                                                item.filterSubID,
                                                item.price,
                                                item.priceBefore,
                                                item.discount,
                                                item.imgUrl,
                                                item.filterSubIDArray,
                                                item.sizeRam,
                                                item.sizeSubRam,
                                                item.slotRam,
                                                item.sataMainBoard,
                                                item.m2MainBoard,
                                                item.mSlotMainBoard,
                                                item.maxMemoryMainBoard,
                                                "add"
                                              )
                                            }
                                          >
                                            <Icon variant="extrasmall">
                                              plus
                                            </Icon>
                                          </Button>
                                          <SemiSpan
                                            fontSize={12}
                                            ml="0.5rem"
                                            color="gray"
                                          >
                                            {item.quantity}
                                          </SemiSpan>
                                          <Button
                                            size="extrasmall"
                                            padding="3px"
                                            color="secondary"
                                            variant="outlinedNoBorder"
                                            type="button"
                                            onClick={() =>
                                              handleAddToSelectedProducts(
                                                item.id,
                                                item.name,
                                                item.categoryID,
                                                item.additionCate,
                                                item.filterID,
                                                item.filterSubID,
                                                item.price,
                                                item.priceBefore,
                                                item.discount,
                                                item.imgUrl,
                                                item.filterSubIDArray,
                                                item.sizeRam,
                                                item.sizeSubRam,
                                                item.slotRam,
                                                item.sataMainBoard,
                                                item.m2MainBoard,
                                                item.mSlotMainBoard,
                                                item.maxMemoryMainBoard,
                                                "remove"
                                              )
                                            }
                                            ml="0.5rem"
                                            style={{
                                              width: "19px",
                                              height: "19px",
                                            }}
                                          >
                                            <Icon variant="extrasmall">
                                              minus
                                            </Icon>
                                          </Button>
                                        </Chip>
                                      </FlexBox>
                                    )}
                                  </FlexBox>
                                </FlexBox>
                              </FlexBox>
                            </FlexBox>

                            <IconButton
                              size="extrasmall"
                              onClick={() =>
                                handleRemoveFromSelectedProducts(item.id)
                              }
                              style={{
                                marginLeft: "auto",
                              }}
                            >
                              <Icon
                                variant="small"
                                defaultcolor="auto"
                                color="error"
                              >
                                delete
                              </Icon>
                            </IconButton>
                          </StyledProductCategory>
                        ))}

                    {(!selectedProduct ||
                      !selectedProduct.some((item) =>
                        value.parent_id !== null
                          ? selectedProduct
                              .find((selectedItem) =>
                                selectedItem.additionCate.includes(
                                  value.categoryID
                                )
                              )
                              ?.additionCate?.some((cate) =>
                                item.additionCate.includes(cate)
                              )
                          : item.categoryID === value.categoryID
                      )) && (
                      <StyledProductCategory
                        mb="0.75rem"
                        onClick={handleCategoryClick(
                          value.categoryID.toString()
                        )}
                        shadow={
                          selected === value.categoryID.toString() ? 8 : null
                        }
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
                        <span className="product-diy-title">
                          {value.title_th}
                        </span>
                      </StyledProductCategory>
                    )}
                  </Fragment>
                ))}

                {selectedProduct.length > 0 && (
                  <Fragment>
                    <StyledProductCategory
                      id="all"
                      mt="2rem"
                      shadow={selected.match("all") ? 4 : null}
                      onClick={handleCreateSpecClick}
                      bg="#d4001a"
                    >
                      <Icon size="20px">tools</Icon>
                      <span
                        id="all"
                        className="product-diy-title"
                        style={{ color: "white" }}
                      >
                        สร้างชุดสเปคคอม
                      </span>
                    </StyledProductCategory>
                    <StyledProductCategory
                      id="all"
                      mt="0.5rem"
                      onClick={handleResetButtonClick}
                      shadow={selected.match("all") ? 4 : null}
                      bg="grey"
                      style={{ padding: "8px" }}
                    >
                      <Box>
                        <span
                          id="all"
                          className="product-diy-title"
                          style={{
                            color: "white",
                          }}
                        >
                          รีเซ็ต
                        </span>
                      </Box>
                    </StyledProductCategory>
                  </Fragment>
                )}
              </Box>
            </Box>
          </Hidden>

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
                <H5 fontSize={18}>{title}</H5>
              </Box>

              <FlexBox
                alignItems="center"
                flexWrap="wrap"
                width="100%"
                mt="1rem"
              >
                <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
                  <Grid item lg={8}>
                    <StyledSearchBox>
                      <Icon className="search-icon" size="18px">
                        search
                      </Icon>

                      <TextField
                        fullwidth
                        onChange={handleSearchChange}
                        value={searchValue}
                        className="search-field"
                        placeholder="ค้นหาสินค้า"
                      />
                    </StyledSearchBox>
                  </Grid>
                </Box>

                <Grid item lg={3}>
                  <Select
                    placeholder="ราคาสูง-ต่ำ"
                    value={selectedSortOption}
                    onChange={handleSortChange}
                    options={sortOptions}
                  />
                </Grid>
              </FlexBox>

              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt="1rem"
              >
                <Grid container spacing={2}>
                  {filters?.map((filter, ind) => (
                    <Grid item key={ind}>
                      <Chip
                        p="0.25rem 1rem"
                        bg={`ihavecpu.light`}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => handleFilterClick(filter)}
                      >
                        <H3
                          fontSize={13}
                          color="ihavecpu.main"
                          style={{ margin: "0", lineHeight: "1" }}
                        >
                          {filter.name_th}
                        </H3>
                        <Icon>arrow-down-filled</Icon>
                      </Chip>

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
                                          : item.name_th}{" "}
                                      </SemiSpan>
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        item.filter_id,
                                        item.name_th
                                      )
                                    }
                                    checked={selectedItems.some(
                                      (selected) =>
                                        selected.id === item.filter_id
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
                    </Grid>
                  ))}
                </Grid>
              </FlexBox>

              <FlexBox
                alignItems="center"
                flexWrap="wrap"
                width="100%"
                mt="0.5rem"
              >
                <Box flex="1 1 0" mr="1.75rem" minWidth="150px"></Box>

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
                    <Grid item lg={3} sm={6} xs={6} key={index}>
                      <ProductCard1Skeleton />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={6}>
                  {productFilter ? (
                    productFilter.data.map((item, ind) => (
                      <Grid item lg={3} sm={6} xs={6} key={ind}>
                        {item ? (
                          <ProductCard1DIY
                            hoverEffect
                            id={item.product_id}
                            slug={formatSlug(item.name_th)}
                            title={item.name_th}
                            price={parseInt(item.price_sale)}
                            priceBefore={parseInt(item.price_before)}
                            off={item.discount}
                            imgUrl={item.image800}
                            categoryID={item.category_id}
                            filterID={item.filter_id}
                            filterSubID={item.filter_sub_id}
                            isInSelectedProducts={selectedProduct.some(
                              (product) => product.id === item.product_id
                            )}
                            onAddToProductIds={() =>
                              handleAddToSelectedProducts(
                                item.product_id,
                                item.name_th,
                                item.category_id,
                                item.addition_cate,
                                item.filter_id,
                                item.filter_sub_id,
                                item.price_sale,
                                item.price_before,
                                item.discount,
                                item.image,
                                item.size,
                                item.size_sub,
                                item.slot,
                                item.sata,
                                item.m2,
                                item.m_slot,
                                item.max_memory,
                                item.filter
                                  .map(
                                    (filterItem) =>
                                      `${filterItem.filter_id},${filterItem.filter_sub_id}`
                                  )
                                  .join(",")
                                  .split(",")
                                  .filter((id) => id.trim() !== "")
                                  .map(Number)
                              )
                            }
                            onRemoveFromProductIds={() =>
                              handleRemoveFromSelectedProducts(item.product_id)
                            }
                          />
                        ) : null}
                      </Grid>
                    ))
                  ) : (
                    <Grid container spacing={6}>
                      <Box ml="2rem">ไม่มีข้อมูล</Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
            <FlexBox
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              mt="32px"
            >
              {productFilter && (
                <SemiSpan>{`Showing ${Math.min(
                  (currentPage - 1) * 12 + 1,
                  productFilter.row
                )} - ${Math.min(currentPage * 12, productFilter.row)} of ${
                  productFilter.row
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
          </Grid>
        </FlexBox>
      </Grid>
      {isModalVisible && (
        <ModalDIY
          selectedProducts={selectedProduct}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      {isModalNavListVisible && (
        <ModalNavListDIY>
          <div style={{ width: "100%" }}>
            <div>
              <FlexBox
                alignItems="center"
                style={{ backgroundColor: "white", marginBottom: "3rem" }}
              >
                <Box className="text-left" display="flex" alignItems="center">
                  <Icon size="12px" mr="0.5rem">
                    menu
                  </Icon>
                  <H5>รายการจัดสเปคคอม</H5>
                </Box>
              </FlexBox>

              <FlexBox>
                <Box className="exit-button">
                  <IconButton
                    type="button"
                    p="3px 6px 3px"
                    style={{ width: "25px", height: "25px" }}
                    onClick={handleCloseModalNavList}
                  >
                    <Icon size="12px">close</Icon>
                  </IconButton>
                </Box>
              </FlexBox>
            </div>
            <div className="selected-products">
              {navList.map((value, i) => (
                <Fragment key={i}>
                  {selectedProduct &&
                    selectedProduct
                      .filter((item) => {
                        if (value.parent_id !== null) {
                          const matchingProduct = selectedProduct.find(
                            (selectedItem) =>
                              selectedItem?.additionCate[0] === value.categoryID
                          );
                          return (
                            matchingProduct &&
                            matchingProduct.additionCate.some((cate) =>
                              item.additionCate.includes(cate)
                            )
                          );
                        } else {
                          return item.categoryID === value.categoryID;
                        }
                      })
                      .map((item, ind) => (
                        <StyledProductCategory
                          key={ind}
                          mb="0.75rem"
                          shadow={
                            selected === value.categoryID.toString() ? 8 : null
                          }
                          bg={
                            selected === value.categoryID.toString()
                              ? "white"
                              : "gray.100"
                          }
                          onClick={() => {
                            handleCategoryClick(value.categoryID.toString())();
                            handleCloseModalNavList();
                          }}
                        >
                          <FlexBox
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <FlexBox alignItems="center">
                              <NextImage
                                src={item.imgUrl}
                                height={40}
                                width={40}
                                objectFit="contain"
                              />
                              <SemiSpan fontSize={12} ml="1rem">
                                {item.name.length > 12
                                  ? item.name.slice(0, 12) + "..."
                                  : item.name}
                              </SemiSpan>
                            </FlexBox>
                          </FlexBox>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleRemoveFromSelectedProducts(item.id)
                            }
                            style={{ marginLeft: "auto" }}
                          >
                            <Icon
                              variant="small"
                              defaultcolor="auto"
                              color="error"
                            >
                              delete
                            </Icon>
                          </IconButton>
                        </StyledProductCategory>
                      ))}

                  {(!selectedProduct ||
                    !selectedProduct.some((item) =>
                      value.parent_id !== null
                        ? selectedProduct
                            .find((selectedItem) =>
                              selectedItem.additionCate.includes(
                                value.categoryID
                              )
                            )
                            ?.additionCate?.some((cate) =>
                              item.additionCate.includes(cate)
                            )
                        : item.categoryID === value.categoryID
                    )) && (
                    <StyledProductCategory
                      mb="0.75rem"
                      onClick={() => {
                        handleCategoryClick(value.categoryID.toString())();
                        handleCloseModalNavList();
                      }}
                      shadow={
                        selected === value.categoryID.toString() ? 8 : null
                      }
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
                      <span className="product-diy-title">
                        {value.title_th}
                      </span>
                    </StyledProductCategory>
                  )}
                </Fragment>
              ))}

              {selectedProduct.length > 0 && (
                <Fragment>
                  <StyledProductCategory
                    id="all"
                    mt="0.5rem"
                    shadow={selected.match("all") ? 4 : null}
                    onClick={handleCreateSpecClick}
                    bg="#d4001a"
                  >
                    <Icon size="20px">tools</Icon>
                    <span
                      id="all"
                      className="product-diy-title"
                      style={{ color: "white" }}
                    >
                      สร้างชุดสเปคคอม
                    </span>
                  </StyledProductCategory>
                  <StyledProductCategory
                    id="all"
                    mt="0.5rem"
                    onClick={handleResetButtonClick}
                    shadow={selected.match("all") ? 4 : null}
                    bg="grey"
                    style={{ padding: "8px" }}
                  >
                    <Box>
                      <span
                        id="all"
                        className="product-diy-title"
                        style={{
                          color: "white",
                        }}
                      >
                        รีเซ็ต
                      </span>
                    </Box>
                  </StyledProductCategory>
                </Fragment>
              )}
            </div>
          </div>
        </ModalNavListDIY>
      )}
    </Fragment>
  );
};
const sortOptions = [
  { label: "ราคาต่ำ-สูง", label_en: "Price Low to High", value: "asc" },
  { label: "ราคาสูง-ต่ำ", label_en: "Price High to Low", value: "desc" },
];
export default Section4;
