import { FC } from "react";
import NextImage from "next/image";
import Box from "@component/Box";
// import Rating from "@component/rating";
// import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import { H4, SemiSpan } from "@component/Typography";
import PriceFormat from "@component/PriceFormat";
// import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";

// =======================================================
type ProductCard4Props = {
  title: string;
  price: number;
  priceBefore?: number;
  rating?: number;
  imgUrl: string;
  off?: string;
  reviewCount?: number;
};
// =======================================================

const ProductCard4: FC<ProductCard4Props> = (props) => {
  const { imgUrl, title, price } = props;

  return (
    <Box>
      <HoverBox mb="1rem" mx="auto" borderRadius={8}>
        {/* {!!off && (
          <Chip
            top="10px"
            left="10px"
            p="5px 10px"
            fontSize="10px"
            fontWeight="600"
            bg="ihavecpu.main"
            position="absolute"
            color="ihavecpu.text"
            zIndex={1}
          >
            {off}%
          </Chip>
        )} */}
        <NextImage
          src={imgUrl}
          width={100}
          height={100}
          layout="responsive"
          alt={title}
        />
      </HoverBox>

      {/* <FlexBox justifyContent="center" alignItems="center" mb="0.25rem">
        <Rating value={rating} color="warn" />

        <Small fontWeight="600" pl="0.25rem">
          ({reviewCount})
        </Small>
      </FlexBox> */}

      <H4
        fontWeight="600"
        fontSize="14px"
        textAlign="center"
        mb="0.25rem"
        title={title}
        ellipsis
      >
        {title}
      </H4>

      <FlexBox alignItems="center" mt="10px">
        <SemiSpan pr="0.5rem" fontWeight="600" color="ihavecpu.main">
          {/* {calculateDiscount(price, off)} */}
          <PriceFormat price={price ?? 0} />
        </SemiSpan>

        {/* {!!off && (
          <SemiSpan color="text.muted" fontWeight="100" fontSize="0.75rem">
            <del>
              <PriceFormat price={priceBefore ?? 0} />
            </del>
          </SemiSpan>
        )} */}
      </FlexBox>
    </Box>
  );
};

export default ProductCard4;
