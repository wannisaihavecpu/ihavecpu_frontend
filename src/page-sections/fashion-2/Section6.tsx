import { FC, useEffect, useState } from "react";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard17 } from "@component/product-cards";
import { Carousel, CarouselWrapper } from "@component/carousel";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";

// ======================================================================
type Section6Props = { products: Product[] };
// ======================================================================

const Section6: FC<Section6Props> = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Featured Products
      </H2>

      <CarouselWrapper>
        <Carousel totalSlides={products.length} visibleSlides={visibleSlides}>
          {products.map((product) => (
            <ProductCard17
              id={product.id}
              key={product.id}
              slug={product.slug}
              title={product.title}
              price={product.price}
              images={product.images}
              imgUrl={product.thumbnail}
              category={product.categories[0]}
              reviews={product.reviews.length || 21}
            />
          ))}
        </Carousel>
      </CarouselWrapper>
    </Container>
  );
};

export default Section6;
