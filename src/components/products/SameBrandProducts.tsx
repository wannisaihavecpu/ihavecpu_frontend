import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import { ProductCard21 } from "@component/product-cards";
import listProduct from "@models/listProduct.model";
import { CarouselProduct } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";

// ============================================================
type Props = { products: listProduct[] };
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
    if (width < 500) setVisibleSlides(3);
    else if (width < 650) setVisibleSlides(3);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName=""
      title="จากแบรนด์เดียวกัน"
      seeMoreLink="#"
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <CarouselProduct
          totalSlides={products.length}
          visibleSlides={visibleSlides}
        >
          {products.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <ProductCard21
                id={item.product_id}
                slug={formatSlug(item.name_th)}
                priceSale={item.price_sale}
                priceBefore={item.price_before}
                title={item.name_th}
                discount={item.discount}
                imgUrl={item.image800}
              />
            </Box>
          ))}
        </CarouselProduct>
      </Box>
    </CategorySectionCreator>
  );
};

export default SameBrandProducts;
