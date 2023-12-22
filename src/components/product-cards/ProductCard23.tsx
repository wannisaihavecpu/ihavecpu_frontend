import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import PriceFormat from "@component/PriceFormat";
import { getTheme } from "@utils/utils";

// styled component
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: ${getTheme("shadows.4")};
  background-color: ${getTheme("colors.body.paper")};

  .product-details {
    padding: 20px;
  }
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
    img {
      height: auto;
      min-width: 100%;
    }
    .product-details {
      // padding: 1rem;
    }
  }
  ${space}
`;

// =====================================================================
interface ProductCard23Props extends SpaceProps {
  qty: number;
  name: string;
  slug: string;
  price: number;
  categoryName?: string;
  imgUrl?: string;
  id: string | number;
}
// =====================================================================

const ProductCard23: FC<ProductCard23Props> = (props) => {
  const { id, name, qty, price, imgUrl, slug, categoryName, ...others } = props;

  // const { dispatch } = useAppContext();
  // const handleCartAmountChange = (amount: number) => () => {
  //   dispatch({
  //     type: "CHANGE_CART_AMOUNT",
  //     payload: { qty: amount, name, price, imgUrl, id },
  //   });
  // };

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
    <Wrapper {...others}>
      <Image
        size={140}
        alt={name}
        display="block"
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
      />

      <FlexBox
        width="100%"
        minWidth="0px"
        flexDirection="column"
        className="product-details"
        justifyContent="space-between"
      >
        <Typography color="gray.600" mr="0.5rem" fontSize={12}>
          {categoryName}
        </Typography>
        <Link href={`/product/${id}/${formatSlug(name)}`}>
          <a>
            <Typography
              className="title"
              fontWeight="600"
              fontSize="18px"
              mb="1.2rem"
            >
              {name}
            </Typography>
          </a>
        </Link>

        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography color="gray.600" mr="0.5rem">
              <PriceFormat price={price} /> x {qty}
            </Typography>

            <Typography fontWeight={600} color="primary.main" mr="1rem">
              <PriceFormat price={price * qty} />
            </Typography>
          </FlexBox>

          <FlexBox alignItems="center">
            <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
              x {qty}
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard23;
