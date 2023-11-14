import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Card from "@component/Card";
import { getTheme } from "@utils/utils";
import { deviceSize } from "@utils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    .imgSkeleton {
      padding-top: 10px;
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
// =======================================================================

const ProductCard1Skeleton = () => {
  return (
    <>
      <Wrapper>
        <div className="image-holder">
          <Box style={{ objectFit: "cover", width: "100%", height: "100%" }}>
            <Skeleton height={200} style={{ paddingTop: "10px" }} />
          </Box>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <a>
                <Box className="title">
                  <Skeleton height={20} />
                </Box>
              </a>

              <FlexBox alignItems="center" mt="10px">
                <Box pr="0.5rem" fontWeight="600" color="ihavecpu.main">
                  <Skeleton width={65} height={20} />
                </Box>

                <Skeleton width={60} height={20} />
              </FlexBox>
            </Box>

            <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent="space-between"
            >
              <div className="item-img">
                <Skeleton width={28} height={28} />
              </div>
            </FlexBox>
          </FlexBox>
        </div>
      </Wrapper>
    </>
  );
};

export default ProductCard1Skeleton;
