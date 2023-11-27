import { useEffect, useState, Fragment } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Section1 from "@sections/compare/Section1";
import Section2 from "@sections/compare/Section2";
import Container from "@component/Container";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import axios from "axios";
import NavbarLayout from "@component/layout/NavbarLayout";
import "react-loading-skeleton/dist/skeleton.css";

const ComparePage = () => {
  const [compareList, setCompareList] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [removedProductId, setRemovedProductId] = useState(null);
  const [addProductResponse, setAddProductResponse] = useState(null);
  const [showAddProductBox, setShowAddProductBox] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const [shouldRenderDeleteButton, setShouldRenderDeleteButton] = useState(
    compareList.length > 1
  );

  // const clearCompareList = () => {
  //   localStorage.removeItem("compareList");

  //   setCompareList([]);
  // };

  // const deleteAllCompare = () => {
  //   clearCompareList();
  //   setApiResponse(null);
  // };

  // const HEADER_LINK = (
  //   <Button
  //     color="primary"
  //     bg="primary.light"
  //     px="2rem"
  //     onClick={deleteAllCompare}
  //   >
  //     ล้างข้อมูล<Icon>delete</Icon>
  //   </Button>
  // );
  const removeProductFromCompare = (productId) => {
    console.log(compareList);
    const index = compareList.findIndex((product) => product.id === productId);

    if (index !== -1) {
      const updatedCompareList = [
        ...compareList.slice(0, index),
        ...compareList.slice(index + 1),
      ];

      // Update the local storage and state
      localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
      setCompareList(updatedCompareList);
      setRemovedProductId(productId);

      // New API request with the updated productIds
      const productIds = updatedCompareList.map((product) => product.id);

      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_PATH
      }/comparetest?product_ids=${productIds.join(",")}`;

      if (productIds.length > 0) {
        axios
          .get(apiUrl)
          .then((response) => {
            setApiResponse(response.data.res_result);
            if (updatedCompareList.length === 1) {
              setShouldRenderDeleteButton(false);
            }
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      } else {
        setApiResponse(null);
      }
    }
  };

  const addProductToCompare = (product) => {
    console.log("product", product.id);

    // Check if the product is already in the compare list
    if (compareList.some((p) => p.id === product.id)) {
      return;
    }

    const updatedCompareList = [
      ...compareList,
      { id: product.product_id, category_id: product.category_id },
    ];
    console.log(updatedCompareList);

    // store the updated compareList in local storage
    localStorage.setItem("compareList", JSON.stringify(updatedCompareList));

    setCompareList(updatedCompareList);

    const productIds = updatedCompareList.map((p) => p.id);

    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_PATH
    }/comparetest?product_ids=${productIds.join(",")}`;

    if (productIds.length > 0) {
      axios
        .get(apiUrl)
        .then((response) => {
          setApiResponse(response.data.res_result);
          setShouldRenderDeleteButton(updatedCompareList.length > 1);
          setShowAddProductBox(true);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      setApiResponse(null);
    }
  };
  const addProduct = () => {
    const categoryIdFromLocalStorage = JSON.parse(
      localStorage.getItem("compareList")
    );

    if (categoryIdFromLocalStorage !== null) {
      // Create a Set to store unique category IDs
      const uniqueCategoryIdsSet = new Set();

      categoryIdFromLocalStorage.forEach((product) => {
        uniqueCategoryIdsSet.add(product.category_id);
      });

      const uniqueCategoryIds = Array.from(uniqueCategoryIdsSet);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=${uniqueCategoryIds}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setAddProductResponse(response.data.res_result.data);
          setShowAddProductBox(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  const backtoMain = () => {
    setShowAddProductBox(true);
  };

  useEffect(() => {
    const storedCompareList =
      JSON.parse(localStorage.getItem("compareList")) || [];

    setCompareList(storedCompareList);

    const productIds = storedCompareList.map((product) => product.id);
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_PATH
    }/comparetest?product_ids=${productIds.join(",")}`;
    console.log(apiUrl);
    if (productIds.length > 0) {
      axios
        .get(apiUrl)
        .then((response) => {
          setisLoading(false);
          setShouldRenderDeleteButton(storedCompareList.length > 1);
          setApiResponse(response.data.res_result);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
      if ((productIds.length = 1)) {
        setShouldRenderDeleteButton(false);
      }
    }
  }, []);

  console.log("addProductResponse", addProductResponse);
  console.log("showAddProductBox", showAddProductBox);

  return (
    <Fragment>
      <Container my="3rem">
        <Box mb="1.5rem">
          <DashboardPageHeader
            iconName="compare1"
            title="เปรียบเทียบสินค้า"
            // button={HEADER_LINK}
          />

          {isLoading && ""}

          {apiResponse ? (
            <Grid container spacing={6}>
              {[0, 1, 2, 3].map((index) => (
                <Fragment key={index}>
                  {apiResponse[index] ? (
                    <Section1
                      productDetail={apiResponse[index]}
                      onRemoveFromCompare={() =>
                        removeProductFromCompare(apiResponse[index].product_id)
                      }
                      shouldRenderDeleteButton={shouldRenderDeleteButton}
                      classStyle={`card ${
                        apiResponse[index].product_id === removedProductId
                          ? "hide"
                          : ""
                      }`}
                    />
                  ) : index === 1 && apiResponse[0] ? (
                    <>
                      <Section2
                        onAddProduct={() => addProduct()}
                        productDetail={addProductResponse}
                        showAddProductBox={showAddProductBox}
                        onAddProductFromCompare={(product) =>
                          addProductToCompare(product)
                        }
                        back={backtoMain}
                      />
                    </>
                  ) : index === 2 && apiResponse[1] ? (
                    <Section2
                      onAddProduct={() => addProduct()}
                      productDetail={addProductResponse}
                      showAddProductBox={showAddProductBox}
                      onAddProductFromCompare={(product) =>
                        addProductToCompare(product)
                      }
                      back={backtoMain}
                    />
                  ) : index === 3 && apiResponse[2] ? (
                    <Section2
                      onAddProduct={() => addProduct()}
                      productDetail={addProductResponse}
                      showAddProductBox={showAddProductBox}
                      onAddProductFromCompare={(product) =>
                        addProductToCompare(product)
                      }
                      back={backtoMain}
                    />
                  ) : null}
                </Fragment>
              ))}
            </Grid>
          ) : (
            <Box mt="20rem"></Box>
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

ComparePage.layout = NavbarLayout;

export default ComparePage;
