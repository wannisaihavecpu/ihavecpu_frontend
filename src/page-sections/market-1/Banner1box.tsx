import { FC } from "react";
import Container from "@component/Container";
import { BannerCardNoText1 } from "@component/banners";
import banner from "@models/banner.model";

type Props = { banner: banner[] };

const Banner1box: FC<Props> = ({ banner }) => {
  return (
    <Container pb="4rem">
      {banner?.map((item, index) => (
        <BannerCardNoText1 img={item.imgUrl} key={index} />
      ))}
    </Container>
  );
};

export default Banner1box;
