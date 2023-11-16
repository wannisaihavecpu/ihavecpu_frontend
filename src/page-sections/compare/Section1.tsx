import { useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import { CardProduct } from "@sections/compare/card";

// ======================================================
// type Props = { carouselData: MainCarouselItem[] };
// ======================================================

const Section1 = ({
  classStyle,
  productDetail,
  onRemoveFromCompare,
  shouldRenderDeleteButton,
}) => {
  const [compareList, setCompareList] = useState([]);
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

  // const clearCompareList = () => {
  //   localStorage.removeItem("compareList");
  //   setCompareList([]);
  // };
  // const deleteAllCompare = () => {
  //   clearCompareList();
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
  useEffect(() => {
    const storedCompareList =
      JSON.parse(localStorage.getItem("compareList")) || [];

    setCompareList(storedCompareList);
  }, []);

  return (
    <Grid item lg={3} md={6} xs={12} spacing={6}>
      <CardProduct
        id={productDetail.product_id}
        slug={formatSlug(productDetail.name_th)}
        title={productDetail.name_th}
        brand={productDetail.brand}
        priceBefore={productDetail.price_before}
        priceSale={productDetail.price_sale}
        discount={productDetail.discount}
        imgUrl={productDetail.image}
        detail={productDetail.product_detail}
        onRemoveFromCompare={onRemoveFromCompare}
        shouldRenderDeleteButton={shouldRenderDeleteButton}
        classStyle={classStyle}
      />
      {compareList && ""}
    </Grid>
  );
};

export default Section1;
