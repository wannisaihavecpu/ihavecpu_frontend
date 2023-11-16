import { FC, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Container from "@component/Container";
import { H2, Paragraph } from "@component/Typography";
import { ProductCard19 } from "@component/product-cards";
import { Carousel } from "@component/carousel";
import { deviceSize } from "@utils/constants";
import useVisibleSlide from "./hooks/useVisibleSlide";
import Product from "@models/product.model";

// styled component
const ButtonsWrapper = styled(FlexBox)({
  gap: "1rem",
  flexWrap: "wrap",
  "& button": { flexGrow: 1 },
  [`@media (max-width: ${deviceSize.md}px)`]: { marginTop: "1rem" },
});

const Accessories: FC = () => {
  const { visibleSlides } = useVisibleSlide();
  const [selected, setSelected] = useState("new");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/market-1/products", { params: { type: selected } })
      .then(({ data }) => setProducts(data));
  }, [selected]);

  const handleSelected = (item: string) => () => setSelected(item);
  const activeColor = (item: string) => (item === selected ? "error" : "dark");

  const buttons = [
    { id: 1, title: "อุปกรณ์สำรองไฟ", type: "new" },
    { id: 2, title: "ซาวด์การ์ด", type: "optics" },
    { id: 3, title: "อะแดปเตอร์และสาย", type: "popular" },
    { id: 4, title: "ลำโพง", type: "speeker" },
    { id: 5, title: "ขายึดจอมอนิเตอร์", type: "view" },
  ];

  return (
    <Container mb="4rem">
      <FlexBox alignItems="center" justifyContent="space-between" flexWrap="wrap" mb="1.5rem">
        <Box>
          <H2 fontSize={20}>Accessories</H2>
          <Paragraph>All our new arrivals in a exclusive brand selection</Paragraph>
        </Box>

        <ButtonsWrapper>
          {buttons.map(({ id, title, type }) => (
            <Button
              key={id}
              variant="outlined"
              color={activeColor(type)}
              onClick={handleSelected(type)}
            >
              {title}
            </Button>
          ))}
        </ButtonsWrapper>
      </FlexBox>
        <Carousel totalSlides={products.length} visibleSlides={visibleSlides}>
          {products.map((product) => (
            <ProductCard19
              id={product.id}
              key={product.id}
              slug={product.slug}
              name={product.title}
              price={product.price}
              images={product.images}
              img={product.thumbnail}
              reviews={product.reviews.length || 15}
            />
          ))}
        </Carousel>
    </Container>
  );
};

export default Accessories;
