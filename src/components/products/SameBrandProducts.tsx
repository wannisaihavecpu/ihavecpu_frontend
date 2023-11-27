import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import { ProductCard1 } from "@component/product-cards";
// import listProduct from "@models/listProduct.model";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";

// ============================================================
type Props = { products };
// ============================================================

const SameBrandProducts: FC<Props> = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(5);
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
    if (width < 500) setVisibleSlides(2);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName=""
      title="จากหมวดหมู่เดียวกัน"
      seeMoreLink="#"
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel
          totalSlides={products.data.length}
          visibleSlides={visibleSlides}
        >
          {products.data.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
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
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default SameBrandProducts;
