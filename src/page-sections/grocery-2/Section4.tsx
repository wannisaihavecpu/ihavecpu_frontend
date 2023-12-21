import { FC, Fragment, useEffect, useState } from "react";
import Box from "@component/Box";
import { H3, H5, SemiSpan } from "@component/Typography";
import Select from "@component/Select";
import TextField from "@component/text-field";
import StyledSearchBox from "@component/search-box/styled";
import menuDropdown from "@models/menuDropdown.model";
import Hidden from "@component/hidden";
import StyledProductCategory from "../market-1/styled";
import Icon from "@component/icon/Icon";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { IconButton } from "@component/buttons";
import NextImage from "next/image";
import { Chip } from "@component/Chip";
import Product from "@models/product.model";
import { ModalNavListDIY } from "@component/modal/styles";
import {
  ProductCard1DIY,
  ProductCard1Skeleton,
} from "@component/product-cards";
import Pagination from "@component/pagination";
import CheckBox from "@component/CheckBox";
// import { Button } from "react-scroll";
import { Button } from "@component/buttons";
import ModalCheckBox from "@component/modal/modalCheckbox";
import ModalDIY from "@component/modal/modalDIY";
import { useRouter } from "next/router";
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
const Section4: FC<Props> = ({ navList, currentPage, setCurrentPage }) => {
  // useState
  // const width = useWindowSize();
  // const { visibleSlides } = useVisibleSlide();
  const [selected, setSelected] = useState("");
  const [productFilter, setProductFilter] = useState(null);
  const [filters, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  // const [view, setView] = useState<"grid" | "list">("grid");
  // const toggleView = useCallback((v) => () => setView(v), []);
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
  const [isModalNavListVisible, setIsModalNavListVisible] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const router = useRouter();

  const [abortController, setAbortController] = useState(new AbortController());

  const handleCloseModalNavList = () => {
    setIsModalNavListVisible(3);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleCloseModal = () => {
    setSelectedFilter(null);
  };

  const handleCategoryClick = (categoryId) => () => {
    const clickedCategory = navList.find(
      (value) => value.categoryID.toString() === categoryId
    );

    if (clickedCategory && selected !== categoryId) {
      setSelectedItems([]);
      setSearchValue("");
      setSelectedSortOption(null);
      setSelected(categoryId);
      setTitle(clickedCategory.title_th);
      setCategoryID(categoryId);
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
  const fetchFilterData = async (category_id: number) => {
    try {
      const filterIds = selectedItems.map((item) => item.id);

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
      const filterIds = selectedItems.map((item) => item.id);
      const findParentID = navList.find(
        (value) => value.categoryID.toString() === category_id
      );

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
      const excludedCateIDs = [48, 97, 98, 99, 34, 49, 25, 267, 50, 37, 38, 39];

      const subFilterNotHaveSameCateID = selectedProduct
        .filter((product) => product.categoryID !== cateID)
        .map((product) => product.filterSubIDArray)
        .flat()
        .filter((value) => value !== null && !isNaN(value));

      if (
        (filterIds.length > 0 || subFilter.length > 0) &&
        !excludedCateIDs.includes(cateID)
      ) {
        // 29 = ram , 28 = mainboard
        if (filterIds.length > 0) {
          apiUrl += `&filter_main=[${filterIds.join(",")}]`;
        }
        // case if click category 29 (ram)
        if (cateID === 29) {
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
            if (subFilterNotHaveCate29.length > 0) {
              apiUrl += `&sub_filter=[${filterString}]`;
            }
          }
        } else if (cateID === 9) {
          // case if click category 9 (cpu)
          // 28(mainboard),30(graphic card)
          const showOnlyCateID9 = [28, 30];
          const subFilterHaveShowOnlyCateID9 = selectedProduct
            .filter((product) => showOnlyCateID9.includes(product.categoryID))
            .map((product) => product.filterSubIDArray)
            .flat()
            .filter((value) => value !== null && !isNaN(value));
          const combinedFilter = [...subFilterHaveShowOnlyCateID9];
          const filterString = combinedFilter.join(",");
          if (subFilterHaveShowOnlyCateID9.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else if (cateID === 28) {
          // case if click category 28 (mainboard)
          // 9(cpu),28(mainboard),30(graphic card),15(harddisk,ssd,m2),46(power supply)
          const showOnlyCateID28 = [9, 15, 29, 30, 46];
          const subFilterHaveShowOnlyCateID28 = selectedProduct
            .filter((product) => showOnlyCateID28.includes(product.categoryID))
            .map((product) => product.filterSubIDArray)
            .flat()
            .filter((value) => value !== null && !isNaN(value));
          const combinedFilter = [...subFilterHaveShowOnlyCateID28];
          const filterString = combinedFilter.join(",");
          if (subFilterHaveShowOnlyCateID28.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else if (cateID === 30) {
          // case if click category 30 (graphic card)
          // 9(cpu),28(mainboard),30(graphic card),46(power supply)
          const showOnlyCateID28 = [9, 29, 30, 46];
          const subFilterHaveShowOnlyCateID30 = selectedProduct
            .filter((product) => showOnlyCateID28.includes(product.categoryID))
            .map((product) => product.filterSubIDArray)
            .flat()
            .filter((value) => value !== null && !isNaN(value));
          const combinedFilter = [...subFilterHaveShowOnlyCateID30];
          const filterString = combinedFilter.join(",");
          if (subFilterHaveShowOnlyCateID30.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else {
          const combinedFilter = [...subFilterNotHaveSameCateID];
          const filterString = combinedFilter.join(",");
          if (subFilterNotHaveSameCateID.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl, {
        signal: abortController.signal,
      });
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        setProductFilter(productData.res_result);
        setLoading(false);
      } else {
        setProductFilter(null);
        setLoading(false);
      }
    } catch (error) {
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

      const cateID = parseInt(categoryID);
      const excludedCateIDs = [48, 97, 98, 99, 34, 49, 25, 267, 50, 37, 38, 39];
      const hasCategory28 = selectedProduct.some(
        (product) => product.categoryID === 28
      );
      const subFilterNotHaveSameCateID = selectedProduct
        .filter((product) => product.categoryID !== cateID)
        .map((product) => product.filterSubIDArray)
        .flat()
        .filter((value) => value !== null && !isNaN(value));

      if (
        (filterIds.length > 0 || subFilter.length > 0) &&
        !excludedCateIDs.includes(cateID)
      ) {
        // 29 = ram , 28 = mainboard
        if (filterIds.length > 0) {
          apiUrl += `&filter_main=[${filterIds.join(",")}]`;
        }
        if (cateID === 29) {
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
        } else if (cateID === 9) {
          // case if click category 9 (cpu)
          // 28(mainboard),30(graphic card)
          const showOnlyCateID9 = [28, 30];
          const subFilterHaveShowOnlyCateID9 = selectedProduct
            .filter((product) => showOnlyCateID9.includes(product.categoryID))
            .map((product) => product.filterSubIDArray)
            .flat()
            .filter((value) => value !== null && !isNaN(value));
          const combinedFilter = [...subFilterHaveShowOnlyCateID9];
          const filterString = combinedFilter.join(",");
          if (subFilterHaveShowOnlyCateID9.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else if (cateID === 28) {
          // case if click category 28 (mainboard)
          // 9(cpu),28(mainboard),30(graphic card),15(harddisk,ssd,m2),46(power supply)
          const showOnlyCateID28 = [9, 15, 29, 30, 46];
          const subFilterHaveShowOnlyCateID28 = selectedProduct
            .filter((product) => showOnlyCateID28.includes(product.categoryID))
            .map((product) => product.filterSubIDArray)
            .flat()
            .filter((value) => value !== null && !isNaN(value));
          const combinedFilter = [...subFilterHaveShowOnlyCateID28];
          const filterString = combinedFilter.join(",");
          if (subFilterHaveShowOnlyCateID28.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else if (cateID === 30) {
          // case if click category 30 (graphic card)
          // 9(cpu),28(mainboard),30(graphic card),46(power supply)
          const showOnlyCateID28 = [9, 29, 30, 46];
          const subFilterHaveShowOnlyCateID30 = selectedProduct
            .filter((product) => showOnlyCateID28.includes(product.categoryID))
            .map((product) => product.filterSubIDArray)
            .flat()
            .filter((value) => value !== null && !isNaN(value));
          const combinedFilter = [...subFilterHaveShowOnlyCateID30];
          const filterString = combinedFilter.join(",");
          if (subFilterHaveShowOnlyCateID30.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        } else {
          const combinedFilter = [...subFilterNotHaveSameCateID];
          const filterString = combinedFilter.join(",");
          if (subFilterNotHaveSameCateID.length > 0) {
            apiUrl += `&sub_filter=[${filterString}]`;
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 800));

      const productResponse = await fetch(apiUrl, {
        signal: abortController.signal,
      });
      const productData = await productResponse.json();

      if (productData.res_code === "00") {
        const isCurrentCategory = cateID === parseInt(categoryID);

        if (isCurrentCategory) {
          setProductFilter(productData.res_result);
          setLoading(false);
          setCurrentPage(newPage);
        } else {
          setLoading(false);
          setProductFilter(null);
        }
      } else {
        setProductFilter(null);
        setLoading(false);
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
    // const existingProductIndex = selectedProduct.findIndex(
    //   (product) => product.categoryID === categoryID
    // );
    const parentCategories = navList.filter((item) => item.parent_id !== null);
    const isParentCategory = parentCategories.some(
      (parentCategory) => parentCategory.parent_id === categoryID
    );
    let numberCateID;

    numberCateID =
      categoryID === 15 || categoryID === 47 ? additionCate : [categoryID];

    const findCategory = navList.find((value) =>
      numberCateID.includes(value.categoryID)
    );

    const calculateTotalSlotRam = selectedProduct
      .filter((product) => product.categoryID === 29)
      .reduce(
        (total, product) =>
          total + parseInt(product.slotRam) * product.quantity,
        0
      );
    const calculateTotalSlotM2 = selectedProduct
      .filter(
        (product) =>
          Array.isArray(product.additionCate) &&
          product.additionCate.includes(39)
      )
      .reduce((total, product) => total + 1 * product.quantity, 0);

    const hasCategory28 = selectedProduct.some(
      (product) => product.categoryID === 28
    );
    const hasCategory29 = selectedProduct.some(
      (product) => product.categoryID === 29
    );
    const hasCategoryM2 = selectedProduct.some(
      (product) =>
        Array.isArray(product.additionCate) && product.additionCate.includes(39)
    );

    const calculateTotalMemoryRam = selectedProduct
      .filter((product) => product.categoryID === 29)
      .reduce(
        (total, product) =>
          total + parseInt(product.sizeRam) * product.quantity,
        0
      );

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
    const maxM2MainBoard = Math.max(
      ...selectedProduct
        .filter((product) => product.categoryID === 28)
        .map((product) => parseInt(product.m2MainBoard) || 0)
    );
    if (existingProduct) {
      if (action === "add") {
        if (categoryID === 29) {
          const calculate =
            calculateTotalSlotRam + parseInt(existingProduct.slotRam);
          if (hasCategory28) {
            if (calculate <= maxMSlotMainBoard && maxMemoryMainBoardCate28) {
              const updatedProducts = selectedProduct.map((product) =>
                product.id === productId
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              );
              setSelectedProduct(updatedProducts);
            }
          } else {
            const updatedProducts = selectedProduct.map((product) =>
              product.id === productId
                ? {
                    ...product,
                    quantity: Math.min(product.quantity + 1, 4),
                  }
                : product
            );
            setSelectedProduct(updatedProducts);
          }
        }
        if (
          categoryID === 15 &&
          Array.isArray(additionCate) &&
          additionCate.includes(39)
        ) {
          const calculate = calculateTotalSlotM2 + 1;
          if (hasCategory28) {
            if (calculate <= maxM2MainBoard) {
              const updatedProducts = selectedProduct.map((product) =>
                product.id === productId
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              );
              setSelectedProduct(updatedProducts);
            }
          } else {
            const updatedProducts = selectedProduct.map((product) =>
              product.id === productId
                ? {
                    ...product,
                    quantity: Math.min(product.quantity + 1, 4),
                  }
                : product
            );
            setSelectedProduct(updatedProducts);
          }
        }
      } else if (action === "remove") {
        if (existingProduct.quantity > 1) {
          const updatedProducts = selectedProduct.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          );

          setSelectedProduct(updatedProducts);
        } else {
          setSelectedProduct((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          notify("error", "ลบสินค้าออกจากสเปคแล้ว");
        }
      }
    } else {
      if (!isParentCategory) {
        // case normally category_id not have parent_id
        const existingProductIndex = selectedProduct.findIndex(
          (product) => product.categoryID === categoryID
        );

        if (categoryID === 28) {
          if (hasCategory29) {
            const maxMemoryMainBoardCategory28 = maxMemoryMainBoard;

            const productsCategory29 = selectedProduct.filter(
              (product) => product.categoryID === 29
            );

            const totalMemoryCategory29 = calculateTotalMemoryRam;

            const isSlotMainBoardValid = productsCategory29.every(
              (product) => product.mSlotMainBoard >= product.slotRam
            );

            if (
              totalMemoryCategory29 >= maxMemoryMainBoardCategory28 ||
              !isSlotMainBoardValid
            ) {
              const updatedProducts = productsCategory29.map((product) => {
                const slotRamRequired =
                  parseInt(product.slotRam) * product.quantity;
                const sizeRamRequired =
                  parseInt(product.sizeRam) * product.quantity;

                // If the slotRamRequired exceeds the mSlotMainBoard or
                // the sizeRamRequired exceeds the maxMemoryMainBoard, adjust the quantity
                if (
                  slotRamRequired > mSlotMainBoard ||
                  sizeRamRequired > maxMemoryMainBoard
                ) {
                  const reductionBySlotRam = Math.floor(
                    mSlotMainBoard / parseInt(product.slotRam)
                  );
                  const reductionBySizeRam = Math.floor(
                    maxMemoryMainBoard / parseInt(product.sizeRam)
                  );
                  const reduction =
                    Math.min(
                      reductionBySlotRam,
                      reductionBySizeRam,
                      product.quantity
                    ) || 0;

                  if (reduction > 0) {
                    return {
                      ...product,
                      quantity: product.quantity - reduction,
                    };
                  } else {
                    return null;
                  }
                }

                return product;
              });

              const filteredProducts = updatedProducts.filter(
                (product) => product?.quantity > 0
              );

              const hasMainBoard = selectedProduct.some(
                (product) => product.categoryID === 28
              );
              if (hasMainBoard) {
                const existingProductIndexCategory28 =
                  selectedProduct.findIndex(
                    (product) => product.categoryID === 28
                  );

                if (existingProductIndexCategory28 !== -1) {
                  // Product in category 28 already exists, update it
                  const updatedProducts = [...selectedProduct];
                  const updatedProduct = {
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

                  updatedProducts.splice(
                    existingProductIndexCategory28,
                    1,
                    updatedProduct
                  );
                  setSelectedProduct(updatedProducts);
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
                notify("success", "เพิ่มหสินค้าในสเปคแล้ว");
              }
              setSelectedProduct((prevProducts) => [
                ...prevProducts.filter((product) => product.categoryID !== 29),
                ...filteredProducts,
              ]);
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

              notify("success", "เพิ่มหกสินค้าในสเปคแล้ว");
            }
          }
          if (hasCategoryM2) {
            const maxMemoryMainBoardCategory28 = m2MainBoard;

            const productsCategory29 = selectedProduct.filter(
              (product) =>
                Array.isArray(product.additionCate) &&
                product.additionCate.includes(39)
            );

            const totalMemoryCategory29 = calculateTotalSlotM2;

            if (totalMemoryCategory29 >= maxMemoryMainBoardCategory28) {
              const updatedProductM2 = productsCategory29.map((product) => {
                const slotM2Required = 1 * product.quantity;

                if (slotM2Required > m2MainBoard) {
                  return {
                    ...product,
                    quantity: maxMemoryMainBoardCategory28,
                  };
                } else {
                  return null;
                }
              });

              const filtereddProducts = updatedProductM2.filter(
                (product) => product?.quantity > 0
              );

              setSelectedProduct((prevProducts) => [
                ...prevProducts.filter(
                  (product) => !product.additionCate.includes(39)
                ),
                ...filtereddProducts,
              ]);
            }
          }

          if (!hasCategory29) {
            if (existingProductIndex !== -1) {
              notify(
                "success",
                `แทนสินค้าในหมวดหมู่ ${findCategory.title_th} แล้ว`
              );
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
            } else {
              notify(
                "success",
                `เพิ่มสินค้าในหมวดหมู่ ${findCategory.title_th} แล้ว`
              );
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
            notify(
              "success",
              `แทนสินค้าในหมวดหมู่ ${findCategory.title_th} แล้ว`
            );
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
            notify(
              "success",
              `เพิ่มสินค้าในหมวดหมู่ ${findCategory.title_th} แล้ว`
            );
          }
        }
      } else {
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
          notify(
            "success",
            `เพิ่มสินค้าในหมวดหมู่ ${findCategory.title_th} แล้ว`
          );
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
        } else {
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
        }
      }
    }
  };

  const handleRemoveFromSelectedProducts = (productId) => {
    const findProduct = selectedProduct.find(
      (value) => value?.id === productId
    );

    let numberCateID;
    if (findProduct) {
      numberCateID =
        findProduct.categoryID === 15 || findProduct.categoryID === 47
          ? findProduct.additionCate
          : [findProduct.categoryID];
    }

    const findCategory = navList.find((value) =>
      numberCateID.includes(value.categoryID)
    );

    setSelectedProduct((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    if (findCategory) {
      notify("error", `ลบสินค้าในหมวดหมู่ ${findCategory.title_th} แล้ว`);
    }
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
    setIsModalNavListVisible(2);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    // set default (first category in api)
    const defaultCategoryID = navList[0].categoryID;
    setCategoryID(defaultCategoryID);
    fetchProductData(defaultCategoryID);
    fetchFilterData(defaultCategoryID);
    setSelected(defaultCategoryID.toString());
    setTitle(navList[0].title_th);
  }, []);
  useEffect(() => {
    let debounceTimeout;
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    debounceTimeout = setTimeout(() => {
      fetchProductData(categoryID, searchValue);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
      abortController.abort();
    };
  }, [searchValue]);
  useEffect(() => {
    fetchFilterData(categoryID);
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
              additionCate: item.addition_cate,
              filterID: item.filter_id,
              filterSubID: item.filter_sub_id,
              price: item.price_sale,
              priceBefore: item.price_before,
              discount: item.discount,
              imgUrl: item.imgUrl,
              filterSubIDArray: item.filterArray,
              sizeRam: item.size,
              sizeSubRam: item.size_sub,
              slotRam: item.slot,
              sataMainBoard: item.sata,
              m2MainBoard: item.m2,
              mSlotMainBoard: item.m_slot,
              maxMemoryMainBoard: item.max_memory,
              quantity: item.quantity,
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
  useEffect(() => {
    const body = document.body;

    if (isModalNavListVisible === 2) {
      // hide main scrollbar
      body.style.overflow = "hidden";
    } else {
      // remove class to show main scrollbar
      body.style.overflow = "visible";
    }
    // clear
    return () => {
      body.style.overflow = "visible";
    };
  }, [isModalNavListVisible]);

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
              onClick={handleToggleModal}
              style={{
                cursor: "pointer",
                transition: "background-color 0.6s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transition = "box-shadow 0.3s ease";
                e.currentTarget.style.boxShadow =
                  "rgba(0, 0, 0, 0.08) 0px 4px 12px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transition = "box-shadow 0.3s ease";

                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Icon size="14px" mr="0.5rem">
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
                                selectedItem?.additionCate.includes(
                                  value.categoryID
                                )
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
                                    {(value.categoryID == 29 ||
                                      value.categoryID == 39) && (
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

              {/* <FlexBox
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
              </FlexBox> */}
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

      <ModalNavListDIY
        className={
          isModalNavListVisible === 1
            ? ""
            : isModalNavListVisible === 2
            ? "open"
            : "exits"
        }
      >
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
                            selectedItem?.additionCate.includes(
                              value.categoryID
                            )
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
                              {item.name.length > 15
                                ? item.name.slice(0, 20) + "..."
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
                            {(value.categoryID == 29 ||
                              value.categoryID == 39) && (
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
                                    <Icon variant="extrasmall">plus</Icon>
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
                                    <Icon variant="extrasmall">minus</Icon>
                                  </Button>
                                </Chip>
                              </FlexBox>
                            )}
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
                            selectedItem.additionCate.includes(value.categoryID)
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
    </Fragment>
  );
};
const sortOptions = [
  { label: "ราคาต่ำ-สูง", label_en: "Price Low to High", value: "asc" },
  { label: "ราคาสูง-ต่ำ", label_en: "Price High to Low", value: "desc" },
];
export default Section4;
