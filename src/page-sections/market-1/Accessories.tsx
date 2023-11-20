import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Container from "@component/Container";
import { H2 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import { deviceSize } from "@utils/constants";
import useVisibleSlide from "./hooks/useVisibleSlide";
import menuDropdown from "@models/menuDropdown.model";
import { ProductCard1, ProductCard1Skeleton } from "@component/product-cards";

// styled component
const ButtonsWrapper = styled(FlexBox)({
  gap: "1rem",
  flexWrap: "wrap",
  "& button": { flexGrow: 1 },
  [`@media (max-width: ${deviceSize.md}px)`]: { marginTop: "1rem" },
});

interface Props {
  category: menuDropdown[];
}

const Accessories: FC<Props> = ({ category }) => {
  const { visibleSlides } = useVisibleSlide();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const fetchProduct = (addition: number) => {
    setLoading(true);
    setTimeout(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/product/list?category_id=50&addition=${addition}&offset=0&limit=8`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.res_code === "00" && Array.isArray(data.res_result)) {
            setProduct(data.res_result);
            setLoading(false);
          } else {
            console.error("Unexpected response:", data);
            setLoading(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }, 800);
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
    const defaultCategoryID = category[0].subCategory[0].categoryID;
    fetchProduct(defaultCategoryID);
    setSelected(defaultCategoryID.toString());
  }, []);

  const handleCategoryClick = (category: string) => () => {
    if (selected.match(category)) {
      setSelected("");
    } else {
      fetchProduct(parseInt(category));
      setSelected(category);
    }
  };
  const activeColor = (item: string) =>
    item === selected ? "ihavecpu" : "dark";

  return (
    <Container mb="4rem">
      <FlexBox
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb="1.5rem"
      >
        <Box>
          <H2 fontSize={20}>{category[0]?.title_th}</H2>
        </Box>

        <ButtonsWrapper>
          {category[0]?.subCategory?.map((subCat) => (
            <Button
              key={subCat.categoryID}
              variant="outlined"
              color={activeColor(subCat.categoryID.toString())}
              onClick={handleCategoryClick(subCat.categoryID.toString())}
            >
              {subCat.title_th}
            </Button>
          ))}
        </ButtonsWrapper>
      </FlexBox>
      <Carousel
        key={selected}
        totalSlides={loading ? 5 : product ? product.length : 5}
        visibleSlides={visibleSlides}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ProductCard1Skeleton key={index} />
            ))
          : product &&
            product.map((item, ind) => (
              <ProductCard1
                key={ind}
                hoverEffect
                id={item.product_id}
                slug={formatSlug(item.name_th)}
                title={item.name_th}
                price={parseInt(item.price_sale)}
                priceBefore={parseInt(item.price_before)}
                off={item.discount}
                imgUrl={item.image800}
              />
            ))}
      </Carousel>
    </Container>
  );
};

export default Accessories;
