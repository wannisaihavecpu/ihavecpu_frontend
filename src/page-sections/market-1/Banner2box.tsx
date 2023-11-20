import { FC } from "react";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import banner from "@models/banner.model";
import { BannerCardNoText1 } from "@component/banners";

type Props = { banner: banner[] };

const Section7: FC<Props> = ({ banner }) => {
  return (
    <Container my="4rem">
      <Grid container spacing={5}>
        {banner?.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <BannerCardNoText1 img={item.imgUrl} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section7;
