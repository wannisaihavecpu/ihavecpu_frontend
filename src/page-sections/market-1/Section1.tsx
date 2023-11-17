import { FC, Fragment } from "react";
import Box from "@component/Box";
import ContainerHome from "@component/ContainerHome";

import Navbar from "@component/navbar/Navbar";
import { Carousel } from "@component/carousel";
import MainCarouselItem from "@models/market-1.model";
import banner from "@models/banner.model";
import styled from "styled-components";
import Grid from "@component/grid/Grid";

// ======================================================
type Props = { carouselData: MainCarouselItem[]; banner: banner[] };
// ======================================================
const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
`;
const StyledGrid = styled(Grid)({
  margin: "auto",
  alignItems: "center",
});
const StyledBox = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  backgroundColor: theme.colors.marron[100],
  borderRadius: "15px",
  "& .carousel-dot": {
    left: 0,
    right: 0,
    bottom: "30px",
    margin: "auto",
    position: "absolute",
  },
  "@media only screen and (max-width: 900px)": {
    borderRadius: "0px",
    "& .carousel-dot": {
      bottom: "10px",
    },
  },
}));

const Section1: FC<Props> = ({ banner }) => {
  return (
    <Fragment>
      <Navbar navListOpen={false} />
      {/* <Navbar navListOpen={true} /> */}

      <ContainerHome pb="2rem">
        <StyledBox id="carouselBox">
          <Carousel
            spacing="0px"
            infinite={true}
            autoPlay={true}
            showDots={true}
            visibleSlides={1}
            showArrow={false}
            totalSlides={banner.length}
            dotClass="carousel-dot"
            dotColor="white"
          >
            {banner.map((item) => (
              <StyledGrid container key={item.id}>
                <ResponsiveImage src={item.imgUrl} />
              </StyledGrid>
            ))}
          </Carousel>
        </StyledBox>
      </ContainerHome>
    </Fragment>
  );
};

export default Section1;
