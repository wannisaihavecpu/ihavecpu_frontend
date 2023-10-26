import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";

// =============================================================
type Props = { products: Product[] };
// =============================================================

const Section3: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator iconName="light" title="Flash Deals" seeMoreLink="#">
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={10} visibleSlides={visibleSlides}>
          {products.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1
                id={item.id}
                slug={item.slug}
                price={item.price}
                title={item.title}
                off={item.discount}
                images={item.images}
                imgUrl={item.thumbnail}
                rating={item.rating || 4}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section3;
