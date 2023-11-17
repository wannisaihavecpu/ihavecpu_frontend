import { FC } from "react";
import Link from "next/link";
import NextImage from "next/image";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import PriceFormat from "@component/PriceFormat";
import FlexBox from "@component/FlexBox";
import { Chip } from "@component/Chip";
// ========================================================
type ProductCard2Props = {
  slug: string;
  title: string;
  priceSale: string;
  priceBefore: string;
  discount: string;
  imgUrl?: string;
  rating?: number;
  images?: string;
  id: string | number;
  description?: string;
};
// ========================================================

const ProductCard2: FC<ProductCard2Props> = ({
  id,
  slug,
  title,
  priceSale,
  priceBefore,
  discount,
  imgUrl,
}) => {
  return (
    <Link href={`/product/${id}/${slug}`}>
      <a>
        <HoverBox borderRadius={8} mb="0.5rem">
          {discount && (
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
              {discount}
            </Chip>
          )}
          <NextImage
            src={imgUrl}
            width={100}
            height={100}
            layout="responsive"
            alt={title}
          />
        </HoverBox>

        <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
          {title.length > 15 ? title.slice(0, 15) + "..." : title}
        </H4>

        <FlexBox alignItems="center" mt="10px">
          <H4 fontWeight="600" fontSize="14px" color="primary.main">
            <PriceFormat price={parseInt(priceSale)} />
          </H4>

          {discount && (
            <H4 color="text.muted" fontWeight="600" fontSize="14px" ml="4px">
              <del>
                <PriceFormat price={parseInt(priceBefore)} />
              </del>
            </H4>
          )}
        </FlexBox>
      </a>
    </Link>
  );
};

export default ProductCard2;
