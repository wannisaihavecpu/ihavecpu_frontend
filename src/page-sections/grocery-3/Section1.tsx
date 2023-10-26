import { FC } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H1 } from "@component/Typography";
import LazyImage from "@component/LazyImage";
import { Button } from "@component/buttons";
import { Carousel } from "@component/carousel";
import { deviceSize } from "@utils/constants";
import { theme } from "@utils/theme";
import { MainCarouselItem } from "@models/grocery-3.model";

// styled components
const StyledBox = styled("div")`
  margin-bottom: 60px;
  overflow: hidden;
  & .carousel-dot {
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    position: absolute;
  }
`;

const StyledGrid = styled(Grid)`
  margin: 0 auto;
  max-width: 1280px;
  align-items: center;
  @media (max-width: ${deviceSize.sm}px) {
    flex-direction: column-reverse;
  }
`;

const GridItemTwo = styled(Grid)`
  padding-left: 80px;
  @media (max-width: ${deviceSize.md}px) {
    padding-left: 40px;
  }
  @media (max-width: ${deviceSize.sm}px) {
    width: 100%;
    padding-left: 0px;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  color: #fff;
  font-weight: 400;
  font-size: 16px;
`;

const GridItemOne = styled(Grid)`
  & .img {
    padding-top: 68px;
  }
  @media (max-width: ${deviceSize.sm}px) {
    width: 100%;
    padding-top: 0px;
  }
`;

const TextBox = styled(Box)`
  max-width: 400px;
  & h1 {
    font-size: 50px;
    font-weight: 600;
    line-height: 1.35;
    margin-bottom: 40px;
  }
  @media (max-width: ${deviceSize.lg}px) {
    & h1 {
      font-size: 45px;
    }
  }
  @media (max-width: ${deviceSize.md}px) {
    padding: 30px;
    max-width: 100%;
    & h1 {
      font-size: 38px;
    }
  }
  @media (max-width: ${deviceSize.sm}px) {
    max-width: 100%;
    text-align: center;
    & button {
      margin: auto;
    }
  }
`;

// ===================================================================
type Props = { carouselData: MainCarouselItem[] };
// ===================================================================

const Section1: FC<Props> = ({ carouselData }) => {
  return (
    <StyledBox id="carouselBox">
      <Carousel
        spacing="0px"
        showDots={true}
        autoPlay={false}
        showArrow={false}
        visibleSlides={1}
        dotClass="carousel-dot"
        totalSlides={carouselData.length}
        dotColor={theme.colors.primary.main}
      >
        {carouselData.map((item, ind) => (
          <Box backgroundColor={theme.colors.paste[50]} key={ind}>
            <StyledGrid container>
              <GridItemOne item md={6} sm={6} xs={12}>
                <Box className="img">
                  <LazyImage
                    priority
                    width={100}
                    height={100}
                    src={item.imgUrl}
                    layout="responsive"
                    objectFit="contain"
                  />
                </Box>
              </GridItemOne>

              <GridItemTwo item md={6} sm={6} xs={12}>
                <TextBox>
                  <H1>{item.title}</H1>

                  <StyledButton variant="contained" color="primary">
                    Shop Now
                  </StyledButton>
                </TextBox>
              </GridItemTwo>
            </StyledGrid>
          </Box>
        ))}
      </Carousel>
    </StyledBox>
  );
};

export default Section1;
