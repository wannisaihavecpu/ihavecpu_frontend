import Box from "@component/Box";
import Image from "@component/Image";
import { CSSProperties, FC } from "react";
import styled from "styled-components";

// custom styled components
const CardWrapper = styled(Box)({
  maxHeight: 200,
  overflow: "hidden",
  borderRadius: "10px",
  position: "relative",
  "& img": { transition: "0.3s" },
  ":hover": { img: { transform: "scale(1.04)" } },
});

// ========================================================
type BannerCardNoText1Props = {
  img: string;
  style?: CSSProperties;
  contentPosition?: "left" | "right";
};
// ========================================================

const BannerCardNoText1: FC<BannerCardNoText1Props> = ({ img, style = {} }) => {
  return (
    <CardWrapper style={style}>
      <Image alt="category" height="100%" width="100%" src={img} />
    </CardWrapper>
  );
};

// set deafult props
BannerCardNoText1.defaultProps = { contentPosition: "left" };

export default BannerCardNoText1;
