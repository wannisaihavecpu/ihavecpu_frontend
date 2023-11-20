import { FC } from "react";
import NextImage from "next/image";
import Card from "@component/Card";
import HoverBox from "@component/HoverBox";

// ===========================================================================
type ProductCard6Props = {
  imgUrl: string;
};
// ===========================================================================

const ProductCard22: FC<ProductCard6Props> = ({ imgUrl }) => {
  return (
    <Card position="relative">
      <HoverBox position="relative" height="165px" borderRadius={8}>
        <NextImage src={imgUrl} layout="fill" objectFit="cover" quality={100} />
      </HoverBox>
    </Card>
  );
};

export default ProductCard22;
