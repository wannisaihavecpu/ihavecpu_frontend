import { FC, useState, useEffect } from "react";
import Card from "@component/Card";
// import Grid from "@component/grid/Grid";
// import { ProductCard2 } from "@component/product-cards";
import { Chip } from "@component/Chip";
import CategorySectionCreator from "@component/CategorySectionCreator";
// import listProduct from "@models/listProduct.model";
import Box from "@component/Box";
import Link from "next/link";
import HoverBox from "@component/HoverBox";
import NextImage from "next/image";
import { H4 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import FlexBox from "@component/FlexBox";
import PriceFormat from "@component/PriceFormat";
import useWindowSize from "@hook/useWindowSize";

// =======================================================
type Props = { product };
// =======================================================

const Newproduct: FC<Props> = ({ product }) => {
  const width = useWindowSize();

  const [visibleSlides, setVisibleSlides] = useState(6);

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);
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
  return (
    <CategorySectionCreator
      iconName="new-product-1"
      title="สินค้ามาใหม่"
      seeMoreLink="#"
    >
      <Box my="-0.25rem">
        <Carousel totalSlides={product.length} visibleSlides={visibleSlides}>
          {product.map((item) => (
            <Box py="0.25rem" key={item.product_id}>
              <Card p="1rem">
                <Link
                  href={`/product/${item.product_id}/${formatSlug(
                    item.name_th
                  )}`}
                  passHref
                >
                  <a>
                    <HoverBox borderRadius={8} mb="0.5rem">
                      {item.discount && (
                        <Chip
                          top="10px"
                          left="10px"
                          p="5px 10px"
                          fontSize="10px"
                          fontWeight="600"
                          bg="ihavecpu.main"
                          position="absolute"
                          color="primary.text"
                          zIndex={1}
                        >
                          {item.discount}
                        </Chip>
                      )}
                      <NextImage
                        width={100}
                        height={100}
                        alt={item.name_th}
                        src={item.image800}
                        layout="responsive"
                      />
                    </HoverBox>

                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                      {item.name_th.length > 15
                        ? item.name_th.slice(0, 15) + "..."
                        : item.name_th}
                    </H4>

                    <FlexBox>
                      <H4
                        fontWeight="600"
                        fontSize="14px"
                        color="primary.main"
                        mr="0.5rem"
                      >
                        <PriceFormat price={parseInt(item.price_sale)} />
                      </H4>
                      {item.discount && (
                        <H4 fontWeight="600" fontSize="14px" color="text.muted">
                          <del>
                            <PriceFormat price={parseInt(item.price_before)} />
                          </del>
                        </H4>
                      )}
                    </FlexBox>
                  </a>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Newproduct;
