import { FC } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import useVisibleSlide from "./hooks/useVisibleSlide";
import Brand from "@models/Brand.model";

// ==========================================================
type Props = { brands: Brand[] };
// ==========================================================

const Featureds: FC<Props> = ({ brands }) => {
  const { visibleSlides } = useVisibleSlide({ initialSlide: 8, md: 4, sm: 3, xs: 3 });

  return (
    <Container my="2rem">
      {/* <H2 fontSize={20} mb="1.5rem">
        Featured Brands
      </H2> */}

      <Box padding="0rem">
        <Carousel
          autoPlay
          showArrow={false}
          totalSlides={brands.length}
          visibleSlides={visibleSlides}
        >
          {brands.map((item) => (
            <FlexBox
              key={item.id}
              height="100%"
              margin="auto"
              maxWidth={90}
              alignItems="center"
              justifyContent="center"
            >
              <Image src={item.image} alt="brand" width="100%" style={{ filter: "grayscale(0)" }} />
            </FlexBox>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default Featureds;
