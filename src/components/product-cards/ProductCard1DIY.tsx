import Link from "next/link";
// import Image from "next/image";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Card, { CardProps } from "@component/Card";
import { H3, SemiSpan, H6 } from "@component/Typography";
import { getTheme } from "@utils/utils";
import { deviceSize } from "@utils/constants";
import ProductQuickView from "@component/products/ProductQuickView";
import PriceFormat from "@component/PriceFormat";
import { IconButton, Button } from "@component/buttons";

// styled component
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// =======================================================================
interface ProductCard1DIYProps extends CardProps {
  off?: number;
  slug: string;
  title: string;
  price: number;
  priceBefore?: number;
  imgUrl?: string;
  rating?: number;
  images?: string[];
  id?: string | number;
  description?: string;
  categoryID?: number;
  filterID?: number;
  filterSubID?: string;
  onAddToProductIds?: (productData: {
    id: string | number;
    categoryID: number;
    filterID: number;
    filterSubID: string;
    imgUrl: string;
  }) => void;
  onRemoveFromProductIds?: (productId: string | number) => void;
  isInSelectedProducts?: boolean;
}
// =======================================================================

const CardMedia = styled(Box)({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": { transition: "0.3s" },
});

const CardBox = styled(Box)({
  borderRadius: "10px",
  transition: "all 0.3s",
  backgroundColor: "white",
  ":hover": {
    border: "0px solid #000",
    "& .product-actions": { right: 5 },
    "& img": { transform: "scale(1.1)" },
  },
});

const FavouriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s",
});

const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent",
});

const ProductCard1DIY: FC<ProductCard1DIYProps> = ({
  id,
  off,
  slug,
  title,
  price,
  priceBefore,
  imgUrl,
  images,
  description,
  onAddToProductIds,
  onRemoveFromProductIds,
  isInSelectedProducts,
  categoryID,
  filterID,
  filterSubID,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleAddToCart = () => {
    onAddToProductIds({
      id,
      categoryID,
      filterID,
      filterSubID,
      imgUrl,
    });
  };
  const handleRemoveFromCart = () => {
    onRemoveFromProductIds(id);
  };

  return (
    <>
      <Wrapper {...props}>
        <div className="image-holder">
          {!!off && (
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
              {off}
            </Chip>
          )}
          <CardBox>
            <CardMedia>
              <Link href={`/product/${id}/${slug}`}>
                {/* <Image
                  src={imgUrl}
                  width={100}
                  height={100}
                  alt={title}
                  objectFit="cover"
                  layout="responsive"
                  className="product-img"
                /> */}
                <img
                  alt={title}
                  width={100}
                  src={imgUrl || "/assets/images/products/nophoto.jpg"}
                  height={100}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Link>

              <AddToCartButton className="product-actions">
                <Icon size="18px">eye</Icon>
              </AddToCartButton>

              <FavouriteButton className="product-actions">
                <Icon size="18px">heart</Icon>
              </FavouriteButton>
            </CardMedia>
          </CardBox>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              {/* <Link href={`/product/${slug}`}> */}
              <a>
                <H3
                  mb="10px"
                  title={title}
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  className="title"
                  color="text.secondary"
                >
                  {title.length > 25 ? title.slice(0, 25) + "..." : title}
                </H3>
              </a>
              {/* </Link> */}
              <H6
                fontSize="12px"
                fontWeight="100"
                color="text.secondary"
                style={{
                  marginTop: "10px",
                  textAlign: "left",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  lineHeight: "1",
                }}
              >
                {description}
              </H6>
              <FlexBox alignItems="center" mt="10px">
                <SemiSpan pr="0.5rem" fontWeight="600" color="ihavecpu.main">
                  {/* {calculateDiscount(price, off)} */}
                  <PriceFormat price={price ?? 0} />
                </SemiSpan>

                {!!off && (
                  <SemiSpan
                    color="text.muted"
                    fontWeight="100"
                    fontSize="0.75rem"
                  >
                    <del>
                      <PriceFormat price={priceBefore ?? 0} />
                    </del>
                  </SemiSpan>
                )}
              </FlexBox>
            </Box>

            <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent="flex-start"
            >
              {isInSelectedProducts ? (
                // Show "minus" button if the product is in the state
                <>
                  <Button
                    size="none"
                    padding="3px"
                    color="ihavecpu"
                    variant="contained"
                    borderColor="ihavecpu.light"
                    onClick={handleRemoveFromCart}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>
                  <SemiSpan
                    color="text.ihavecpu"
                    fontSize="13px"
                    fontWeight="600"
                  >
                    {/* You can add additional styling here */}
                    {/* {cartItem.qty} */}
                  </SemiSpan>
                </>
              ) : (
                // Show "plus" button if the product is not in the state
                <Button
                  size="none"
                  padding="3px"
                  color="ihavecpu"
                  variant="outlined"
                  borderColor="ihavecpu.main"
                  onClick={handleAddToCart}
                >
                  <Icon variant="small">plus</Icon>
                </Button>
              )}
            </FlexBox>
          </FlexBox>
        </div>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images, title, price, id, slug }}
      />
    </>
  );
};

export default ProductCard1DIY;
