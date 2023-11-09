import { FC } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import Container from "@component/Container";
import { H3, Paragraph, Span } from "@component/Typography";
import { deviceSize } from "@utils/constants";

// styled components
const BannerWrapper = styled(Box)({
  gap: "5rem",
  padding: "3rem",
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  borderRadius: "10px",
  alignItems: "center",
  backgroundSize: "cover",
  justifyContent: "flex-end",
  backgroundPosition: "center left",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(/assets/images/banners/long-banner.jpg)`,

  [`@media (max-width: ${deviceSize.md}px)`]: {
    gap: "1rem",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const StyledButton = styled(Button)({
  borderRadius: 0,
  backgroundColor: "white",
  ":focus": { boxShadow: "none" },
});

const Banner1box: FC = () => {
  return (
    <Container pb="4rem">
      <BannerWrapper>
        <Box textAlign="center">
          <H3 fontSize={36} lineHeight={1}>
            ลดกระหน่ำ{" "}
            <Span color="primary.main" fontSize="inherit">
              50% 
            </Span>{" "}
            เกมมิ่งเกียร์
          </H3>
          <Paragraph fontSize={16}>
            เฉพาะสินค้าเกมมิ่งเกียร์ที่ร่วมรายการ
          </Paragraph>
        </Box>

        <StyledButton size="large">ดูรายละเอียด</StyledButton>
      </BannerWrapper>
    </Container>
  );
};

export default Banner1box;
