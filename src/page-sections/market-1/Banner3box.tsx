import { FC } from "react";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import { BannerCardNoText1 } from "@component/banners";
import banner from "@models/banner.model";

type Props = { banner: banner[] };

const Banner3box: FC<Props> = ({ banner }) => {
  return (
    <Container mb="4rem">
      <Grid container spacing={5}>
        {banner?.map((item, index) => (
          <Grid item md={4} xs={12} key={index}>
            <BannerCardNoText1 img={item.imgUrl} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Banner3box;
